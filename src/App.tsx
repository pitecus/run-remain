import './App.css';

import { useState } from 'react';

function App() {
  // State for individual distances.
  const [distTotal, setDistTotal] = useState('');
  const [distToLoop, setDistToLoop] = useState('');
  const [distCurrent, setDistCurrent] = useState('');
  const [distToGoBeforeReturn, setDistToGoBeforeReturn] = useState(0);

  // State for selected item.
  const [selected, setSelected] = useState('');

  // Numpad entries.
  const numpad: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

  // Track the selected component.
  const onSetSelected = (entry: 'total' | 'start' | 'current') => {
    return () => {
      if (selected === entry) {
        setSelected('');
        return;
      }
      setSelected(entry);
    };
  };

  // Track numpad clicks.
  const onNumpadClick = (keyValue: string) => {
    return () => {
      // With nothing selected, no changes.
      if (selected === '') {
        return;
      }

      // Backpace function
      const backspacer = (d: string) => d.slice(0, -1);

      // Appender function.
      const appender = (d: string) => `${d}${keyValue}`;

      // Recalculator.
      const reCaclculator = (total: string, toLoop: string, current: string): void => {
        // Check for invalid values.
        const { tot, to, cur } = {
          tot: parseFloat(total) || 0,
          to: parseFloat(toLoop) || 0,
          cur: parseFloat(current) || 0
        };

        console.log(cur, to, tot);
        if (cur + to >= tot) {
          setDistToGoBeforeReturn(tot - (cur + to));
          return;
        }

        // Update the remain distance.
        setDistToGoBeforeReturn(cur + (tot - to - cur) / 2);
      };

      switch (selected) {
        case 'total':
          if (keyValue === 'backspace') {
            setDistTotal((e) => {
              const total = backspacer(e);
              reCaclculator(total, distToLoop, distCurrent);
              return total;
            });
          } else {
            setDistTotal((e) => {
              const total = appender(e);
              reCaclculator(total, distToLoop, distCurrent);
              return total;
            });
          }
          break;
        case 'start':
          if (keyValue === 'backspace') {
            setDistToLoop((e) => {
              const toLoop = backspacer(e);
              reCaclculator(distTotal, toLoop, distCurrent);
              return toLoop;
            });
          } else {
            setDistToLoop((e) => {
              const toLoop = appender(e);
              reCaclculator(distTotal, toLoop, distCurrent);
              return toLoop;
            });
          }
          break;
        case 'current':
          if (keyValue === 'backspace') {
            setDistCurrent((e) => {
              const current = backspacer(e);
              reCaclculator(distTotal, distToLoop, current);
              return current;
            });
          } else {
            setDistCurrent((e) => {
              const current = appender(e);
              reCaclculator(distTotal, distToLoop, current);
              return current;
            });
          }
          break;
      }
    };
  };

  // Return the component.
  return (
    <div className="flex flex-col h-screen p-2">
      <header className="print:hidden pb-2">
        {/* Page title */}
        <h1 className="border-b-2 border-gray-300 font-bold text-2xl text-indigo-900">Run Remain</h1>
      </header>
      <main className="flex-grow flex flex-col justify-between bg-gray-50">
        {/* Distances */}
        <div className="grid grid-cols-2 gap-2 bg h-1/3 pb-2">
          {/* Total planned distance */}
          <div
            className={`rounded-lg shadow-lg p-2 flex flex-col justify-between ${selected === 'total' ? 'bg-green-200' : 'bg-gray-200'}`}
            onClick={onSetSelected('total')}
          >
            <p className="text-indigo-700 text-sm -mt-1">Total Distance</p>
            <p className="text-right text-6xl font-mono">{distTotal}</p>
          </div>
          {/* From start to begining of the loop */}
          <div
            className={`rounded-lg shadow-lg p-2 flex flex-col justify-between ${selected === 'start' ? 'bg-green-200' : 'bg-gray-200'}`}
            onClick={onSetSelected('start')}
          >
            <p className="text-indigo-700 text-sm -mt-1">From start to loop</p>
            <p className="text-right text-6xl font-mono">{distToLoop}</p>
          </div>
          {/* Current distance in the loop */}
          <div
            className={`rounded-lg shadow-lg p-2 flex flex-col justify-between ${selected === 'current' ? 'bg-green-200' : 'bg-gray-200'}`}
            onClick={onSetSelected('current')}
          >
            <p className="text-indigo-700 text-sm -mt-1">Loop distance</p>
            <p className="text-right text-6xl font-mono">{distCurrent}</p>
          </div>
          {/* Distance to return */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col justify-between">
            <p className="text-indigo-100 text-sm -mt-1">Distance to return</p>
            <p className="text-right text-white text-6xl font-mono">{distToGoBeforeReturn}</p>
          </div>
        </div>
        {/* Numpad */}
        <div className="grid grid-cols-3 gap-1.5 bg-indigo-50 h-2/3">
          {numpad.map((key) => (
            <div
              className="flex justify-center items-center bg-indigo-300 rounded-lg text-6xl shadow-lg font-mono"
              onClick={onNumpadClick(key)}
              key={key}
            >
              {key}
            </div>
          ))}
          <div className="flex justify-center items-center bg-red-700 rounded-lg shadow-lg" onClick={onNumpadClick('backspace')}>
            <svg
              height="50"
              width="50"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="stroke-current fill-current text-white"
              viewBox="0 0 44.18 44.18"
            >
              <g>
                <path d="M10.625,5.09L0,22.09l10.625,17H44.18v-34H10.625z M42.18,37.09H11.734l-9.375-15l9.375-15H42.18V37.09z" />
                <polygon
                  points="18.887,30.797 26.18,23.504 33.473,30.797 34.887,29.383 27.594,22.09 34.887,14.797 33.473,13.383 26.18,20.676
                  18.887,13.383 17.473,14.797 24.766,22.09 17.473,29.383 	"
                />
              </g>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
