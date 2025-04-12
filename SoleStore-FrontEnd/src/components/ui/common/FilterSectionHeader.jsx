import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSectionHeader = ({ title, isOpen, toggle, count }) => (
  <div
    className="flex items-center justify-between cursor-pointer py-2"
    onClick={toggle}
  >
    <h4 className="font-medium text-gray-700">{title}</h4>
    <div className="flex items-center">
      {count !== undefined && (
        <span className="text-sm text-gray-500 mr-2">{count}</span>
      )}
      {isOpen ? (
        <FaChevronUp className="text-gray-400" />
      ) : (
        <FaChevronDown className="text-gray-400" />
      )}
    </div>
  </div>
);

FilterSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  count: PropTypes.number
};

export default FilterSectionHeader;