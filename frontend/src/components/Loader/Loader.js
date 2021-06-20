import { Fade } from "react-awesome-reveal";

export const Loader = () => {
    return (
        <section className="h-screen flex justify-center items-center">
            <Fade>
                <div className="loading-loader">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            </Fade>
        </section>
    );
};
