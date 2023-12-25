const List = ({list}) => {
const noDoubles = [...new Set([...list])]
const results = noDoubles.map((el) => <li key={el}>{el}</li>)

    return ( <ul>{results}</ul> );
}
 
export default List;