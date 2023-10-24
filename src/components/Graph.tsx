import React, { useRef, useEffect } from 'react';
import { init, EChartsOption, ECharts } from 'echarts';
import data from '@/app/data.json';

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
      // scaleLimit: {
      //   min: 0.4,
      //   max: 2,
      // },
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
        })
        .catch((err) => console.log(err));

      return 'Loading';
    },
  },
};

export default function Graph() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      let chart: ECharts | undefined;
      chart = init(chartRef.current);
      chart.setOption(option);
    }
  }, []);

  return <div ref={chartRef} className="w-[1200px] h-[800px] border-2" />;
}
