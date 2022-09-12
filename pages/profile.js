import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userFetching, userFetched, userFetchingError } from "../actions/actions";

const profile = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {user} = useSelector(state => state.reducer)

    useEffect(() => {
        if (user === ''){
            dispatch(userFetching())
            request(`${parameters.API_HOST}/getuserinfo`)
                .then(response => dispatch(userFetched(response.data)))
                .catch(() => dispatch(userFetchingError()))
        }
    }, [])
    return (
        <>
            <Layout></Layout>

        </>
    )
}

export default profile;