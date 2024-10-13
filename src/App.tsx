import './App.css';
import WeekdayDateRangePicker from './WeekdayDateRangePicker';

function App() {
  const handleRangeChange = (range: [string[], string[]]) => {
    console.log('Selected Range:', range[0]);
    console.log('Weekend Dates:', range[1]);
  };

  const predefinedRanges: [Date, Date][] = [
    [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
    [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
  ];

  return (
    <div className="App">
      <h1>Week Date Range Picker </h1>
      <WeekdayDateRangePicker
        onChange={handleRangeChange}
        predefinedRanges={predefinedRanges}
      />
    </div>
  );
}

export default App;
