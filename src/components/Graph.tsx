import React, { useState, useRef, useEffect } from 'react';
import { init, getInstanceByDom, EChartsOption } from 'echarts';
import { produce } from 'immer';

interface Node {
  id: string;
  name: string;
  value: number;
  category: number;
}

interface Link {
  source: string;
  target: string;
}

interface Category {
  name: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
  categories: Category[];
}

export default function Graph() {
  const [data, setData] = useState<GraphData>();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      const json = await import('@/app/data.json');
      setData(json);
    };
    getData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !data) {
      return;
    }

    const updateData = async () => {
      const newLink: Link = {
        source: '46', // Jondrette
        target: '74', // Child2
      };
      const newData = produce(data, (draft) => {
        draft.links.push(newLink);
      });
      setData(newData);
    };

    const option: EChartsOption = {
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          // layout: 'none', // requires xy positions hardcoded
          layout: 'force',
          data: data.nodes,
          links: data.links,
          categories: data.categories,
          symbolSize: 5,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
          },
          force: {
            repulsion: 100,
          },
          labelLayout: {
            hideOverlap: true,
          },
        },
      ],
      legend: [
        {
          data: data.categories.map(function (a) {
            return a.name;
          }),
        },
      ],
      // @ts-ignore
      tooltip: {
        triggerOn: 'click',
        formatter: (params: any, ticket, callback) => {
          fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then((response) => response.json())
            .then((json) => {
              const output = `api request <br /> ${JSON.stringify(params.data)} <br />
              api response <br /> ${JSON.stringify(json)}`;
              callback(ticket, output);

              if (params.data.id === '46') {
                updateData();
              }
            })
            .catch((err) => console.log(err));

          return 'Loading';
        },
      },
    };

    let chart = getInstanceByDom(chartRef.current);

    if (!chart) {
      chart = init(chartRef.current);
    }

    chart.setOption(option);
  }, [data]);

  console.log('render');

  return <div ref={chartRef} className="w-[1200px] h-[800px] border-2" />;
}
