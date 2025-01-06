import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProductFilters({ filters, onFilterChange }) {
  const { category, brand, status } = filters;

  const categories = ["All", "Electronics", "Accessories"];
  const brands = ["All", "SoundMax", "TechVision", "TimeStyle", "PhotoPro"];
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select value={category} onValueChange={(value) => onFilterChange("category", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={brand} onValueChange={(value) => onFilterChange("brand", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((b) => (
            <SelectItem key={b} value={b}>{b}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={(value) => onFilterChange("status", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}