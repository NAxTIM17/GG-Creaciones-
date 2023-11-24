const ErrorPage = () => {
    return ( 
        <div className="m-10">
            <p className="text-blue-950 text-4xl font-bold">Error 404: La pagina no existe.</p>
            <p className="text-lg m-5">URL '{window.location.href}' no encontrada... </p>
        </div>
    )
}
export default ErrorPage;
