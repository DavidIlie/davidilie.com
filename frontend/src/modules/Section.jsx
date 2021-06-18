export default function Section(props) {
    return (
        <div className="bg-white text-black pl-10 pr-10 lg:pl-24 lg:pr-24 pt-5 pb-5">
            <h1 className="text-5xl mb-5">{props.title || "Section"}</h1>
            {props.children}
        </div>
    );
}
