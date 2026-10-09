import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCategories } from "../hooks/useCategories.js";

function Categories() {
  const { categories, addCategory, deleteCategory } = useCategories();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#2563eb");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter a category name.");
      return;
    }

    const categoryExists = categories.some(
      (category) => category.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (categoryExists) {
      setError("This category already exists.");
      return;
    }

    const category = {
      id: crypto.randomUUID(),
      name: trimmedName,
      color,
    };

    addCategory(category);

    setName("");
    setColor("#2563eb");
    setError("");
  }

  function handleDelete(category) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (confirmed) {
      deleteCategory(category.id);
    }
  }

  return (
    <main className="categories-page">
      <header>
        <h1>Categories</h1>
        <p>Manage your income and expense categories</p>
      </header>

      <section className="category-form-section">
        <h2>Add Category</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category-name">Category Name</label>

            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="e.g. Internet"
              required
            />
          </div>

          <div>
            <label htmlFor="category-color">Category Color</label>

            <input
              id="category-color"
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Add Category</button>
        </form>
      </section>

      <section className="categories-section">
        <h2>Your Categories</h2>

        {categories.length === 0 ? (
          <p className="empty-state">No categories yet.</p>
        ) : (
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.id}>
                <div className="category-info">
                  <span
                    className="category-color"
                    style={{
                      backgroundColor: category.color,
                    }}
                  />

                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.color}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="icon-button delete-button"
                  onClick={() => handleDelete(category)}
                  aria-label={`Delete ${category.name}`}
                  title="Delete category"
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Categories;
