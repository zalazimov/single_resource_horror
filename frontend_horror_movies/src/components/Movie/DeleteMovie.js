import { deleteMovieById } from '../api';
import { useNavigate } from 'react-router-dom';

function DeleteMovie({ setShowDel, setShowForm, id, title, }) {
    const navigate = useNavigate()
    const handleDelete = () => {
        deleteMovieById(id).then(res => navigate('/index')).catch(e => { console.log(e); })
        setShowDel(false);
        setShowForm(false);
    };

    return (<> <div className="modal-header"><h5 className="modal-title">Friendly Warning</h5>
        <button type="button" className="close" onClick={() => { setShowDel(false); setShowForm(false) }}>
            <span>&times;</span>
        </button>
    </div>
        <div className="modal-body">
            {`Are you sure you want to delete ${title}?`}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => { setShowDel(false); setShowForm(false) }}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Confirm</button>
        </div>
    </>
    );
}

export default DeleteMovie;