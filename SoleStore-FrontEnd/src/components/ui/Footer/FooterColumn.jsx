import PropTypes from 'prop-types';

const FooterColumn = ({ title, links }) => {
    return (
        <div className="mb-6">
            <h6 className="text-white font-semibold mb-5 text-lg relative inline-block pb-2">
                {title}
                <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></span>
            </h6>
            
            <ul className="space-y-3">
                {links.map((link, index) => (
                    <li key={index} className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                        <a 
                            href={link.href} 
                            className="text-white hover:text-amber-300 flex items-center text-sm group transition-all duration-200"
                        >
                            <span className="text-amber-500 group-hover:text-amber-300 mr-2 transform group-hover:translate-x-1 transition-all duration-200 opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

FooterColumn.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

export default FooterColumn;