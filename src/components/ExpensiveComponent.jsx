import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onItemClick }) => {
  // Expensive calculation memoized
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: complexCalculation(item.value)
    }));
  }, [data]);
  
  // Memoized callback
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return (
    <div className="expensive-component">
      {processedData.map(item => (
        <div 
          key={item.id} 
          onClick={() => handleClick(item.id)}
          className="item"
        >
          {item.name}: {item.processed}
        </div>
      ))}
    </div>
  );
});

function complexCalculation(value) {
  // Simulate expensive operation
  return value * 2;
}

export default ExpensiveComponent; 