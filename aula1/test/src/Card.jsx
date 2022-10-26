
export function Card(props) {
    const teste = 'TESTE';
    return (
        <div>
            <h2>{props.titulo}</h2>
            <p>{props.descricao}</p>
            <p><strong>Autor:</strong>{props.autor}</p>
        
        </div>
    )
}