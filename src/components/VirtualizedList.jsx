import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items, itemHeight = 50, windowHeight = 400 }) => {
  const Row = ({ index, style }) => (
    <div style={style} className="list-item">
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={windowHeight}
      width="100%"
      itemCount={items.length}
      itemSize={itemHeight}
    >
      {Row}
    </FixedSizeList>
  );
};

export default VirtualizedList; 