import ErrorPage from "@components/ErrorPage";

export default function Custom404(): JSX.Element {
    return <ErrorPage statusCode={404} message="Not Found" />;
}
