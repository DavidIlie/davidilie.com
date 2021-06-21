//TODO FIND A WAY TO COVER THE ENTIRE PAGE

export const UpDown = ({ children, type }) => {
    return (
        <div
            className={`${
                type === `wide`
                    ? `UpDownWideAnimation`
                    : type === `slow`
                    ? `UpDownSlowAnimation`
                    : `UpDownAnimation`
            } overflow-hidden absolute top-0 left-0 right-0`}
            style={{ zIndex: -500, bottom: "-100vh" }}
        >
            {children}
        </div>
    );
};
