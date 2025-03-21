export interface Meal {
  idMeal: string; // รหัสอาหาร
  strMeal: string; // ชื่ออาหาร
  strCategory?: string; // หมวดหมู่
  strArea?: string; // ภูมิภาค
  strInstructions?: string; // วิธีทำ (มีใน lookup)
  strMealThumb?: string; // URL รูปภาพ
  [key: string]: any; // รองรับฟิลด์เพิ่มเติม เช่น strIngredient1, strMeasure1
}

export interface SearchResponse {
  meals: Meal[] | null; // null ถ้าไม่พบ
}

export interface LookupResponse {
  meals: Meal[] | null; // คืนมาเป็น array แต่ปกติมี 1 item
}
