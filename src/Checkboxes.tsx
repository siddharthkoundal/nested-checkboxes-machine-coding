const Checkboxes = ({ data, checked, setChecked }) => {
  const handleToggle = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node.children.forEach((child) => {
          newState[child.id] = isChecked;
          if (child.children) {
            updateChildren(child);
          }
        });
      };
      updateChildren(node);

      return newState;
    });
  };

  console.log(checked);

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} style={{ paddingLeft: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={checked[node.id] ?? false}
              onChange={(e) => handleToggle(e.target.checked, node)}
            />
            <span>{node.label}</span>
          </label>
          {node.children && node.children.length > 0 && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
