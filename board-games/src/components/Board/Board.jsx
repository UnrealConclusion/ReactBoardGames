import PropTypes from "prop-types"

/**
 * Compnent Used To Render The Game Board
 * - used to track when the mouse has exited the board 
 * - will call onMouseLeave when the mouse leaves the board 
 */
export default function Board({onMouseLeave=()=>{}, children, className=""}) {
    return (
      <div className={className} onMouseLeave={onMouseLeave}>
        {children}
      </div>
    );
}

Board.propTypes = {
    onMouseLeave: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
}