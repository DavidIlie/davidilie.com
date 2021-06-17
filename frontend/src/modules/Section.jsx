export default function Section(props) {
    return (
        <div className="bg-white text-black pl-24 pr-24 pt-5 pb-5">
            <h1 className="text-5xl mb-5">{props.title || "Section"}</h1>
            {props.children}
        </div>
    );
}
