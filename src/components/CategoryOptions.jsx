function CategoryOptions({ categories }) {
  return (
    <>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </>
  );
}

export default CategoryOptions;