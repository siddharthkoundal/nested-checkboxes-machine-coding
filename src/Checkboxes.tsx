const Checkboxes = ({ data, checked, setChecked, ancestors = [] }) => {
  const handleToggle = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      // Parent → children: apply the selected value to every descendant.
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          if (child.children && child.children.length > 0) {
            updateChildren(child);
          }
        });
      };
      updateChildren(node);

      // Child → parent: recompute ancestors from nearest parent to root.
      [...ancestors].reverse().forEach((parent) => {
        const children = parent.children ?? [];

        newState[parent.id] =
          children.length > 0 &&
          children.every((child) => newState[child.id] ?? false);
      });

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
          {/* Recursively render children while carrying their ancestor path. */}
          {node.children && node.children.length > 0 && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
              ancestors={[...ancestors, node]}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
