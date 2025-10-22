/* eslint-disable @typescript-eslint/no-explicit-any */
interface SortSelectProps {
    value: string;
    onChange: (value: any) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
    return (
        <div className="flex justify-end mb-4">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border px-4 py-2 rounded-xl text-sm font-mono w-full md:w-auto"
            >
                <option value="">Default</option>
                <option value="asc">Price: Low → High</option>
                <option value="desc">Price: High → Low</option>
            </select>
        </div>
    );
};

export default SortSelect;
