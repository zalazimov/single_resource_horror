import React, {useState, useContext} from 'react'
import { fetchMovieByTitle } from '../api'
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../Context/context';

function Searchbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { setIsLoading,  } = useContext(MovieContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (search === '') return;
        setIsLoading(true)
        navigate(`/search?query=${encodeURIComponent(search)}`);
        //fetchMovieByTitle(search).then(res =>{ console.log(res.data[0]); navigate(`/movies/${res.data[0].id}`)}).catch(e => setSearch(''));
        setSearch('');
        setIsLoading(false);

    }
    return <>
        <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name='search' onChange={(e) => setSearch(e.target.value)} value={search}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </>

}

export default Searchbar