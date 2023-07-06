'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './categorySelector.module.css';
import { Category } from '@/app/types';

type CategorySelectorProps = {
  onCategorySelected: (category: Category) => void;
};

const fetchSubCategories = async (id?: string) => {
  const res = await fetch(
    `http://localhost:8081/categories/sub/${id ? id : ''}`
  );
  const {
    result: { categories },
  } = await res.json();
  return categories;
};
const searchCategories = async (keyword: string) => {
  const res = await fetch(
    `http://localhost:8081/categories/autocomplete/${keyword}`
  );
  const {
    result: { categories },
  } = await res.json();
  return categories;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onCategorySelected,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [categoryStack, setCategoryStack] = useState<Category[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log('dropdown', isDropdownVisible);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownVisible) {
      let categories;
      (async () => {
        categories = searchTerm.trim()
          ? await searchCategories(searchTerm)
          : await fetchSubCategories('root');

        setResults([...(categories as unknown as Category[])]);
        setCategoryStack([
          { _id: 'root', hasChildren: true, name: 'root' } as Category,
        ]);
      })();
    }
  }, [isDropdownVisible]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    if (value) {
      const categories = await searchCategories(value);
      if (categories && categories.length > 0) {
        setResults(categories);
      }
    } else {
      console.log('change', false);
      setResults([]);
      setDropdownVisible(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log('outside', isDropdownVisible);
    debugger;
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  const handleClick = (category: Category) => {
    setSelectedCategory(category);
    onCategorySelected(category);
    setSearchTerm(category.name);
    setResults([]);
    console.log('click');
    setDropdownVisible(false);
  };

  const handleCategoryClick = async (category: Category) => {
    // NEW

    setCategoryStack([...categoryStack, category]);
    const categories = await fetchSubCategories(category._id);
    setResults([...categories]);
  };

  const handleBackClick = () => {
    const newStack = [...categoryStack];
    newStack.pop();
    setCategoryStack(newStack);
    if (newStack.length > 0) {
      fetchSubCategories(newStack[newStack.length - 1]._id).then((data) => {
        setResults(data);
      });
    } else {
      setResults([]);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!dropdownRef.current) return;
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      console.log('blur');
      setDropdownVisible(false);
      return;
    }
  };

  const handleDropdownBlur = (event: React.FocusEvent<HTMLUListElement>) => {
    console.log('dropdown blur');
    debugger;
    if (dropdownRef.current?.contains(event.relatedTarget)) return;
    setDropdownVisible(false);
  };

  return (
    <div>
      <div className={styles.categorySelector} ref={dropdownRef}>
        <div style={{ display: 'flex' }}>
          <input
            type='text'
            value={searchTerm}
            onChange={handleChange}
            className={styles.inputField}
            onFocus={() => setDropdownVisible(true)}
            //onBlur={handleInputBlur}
          />
        </div>
        {isDropdownVisible && results.length > 0 && (
          <ul
            className={styles.categoryResults}
            //onBlur={handleDropdownBlur}
          >
            <li onClick={handleBackClick} className={styles.categoryItem}>
              {categoryStack.length > 1
                ? 'Back to' + categoryStack[categoryStack.length - 1].name
                : 'Root'}
            </li>

            {results.map((category, index) => (
              <li key={index} className={styles.categoryItem}>
                <span onClick={() => handleClick(category)}>
                  {category.name}
                </span>
                {category.hasChildren && (
                  <button onClick={() => handleCategoryClick(category)}>
                    &#39
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
