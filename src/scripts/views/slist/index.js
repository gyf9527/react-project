import "./index.scss";
// import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Head } from "../../components/head";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";

export class Slist extends Component {

    state = {
        name: "",
        songs: []
    }

    componentWillMount() {
        console.log(this.props)
        var sName = this.props.match.params.name;
        this.setState({
            name: sName
        })

        axios.get("/react/searchSongs", {
            params: {
                keyword: sName
            }
        }).then(res => {
            this.setState({
                songs: res.data.result
            })
        })
    }

    render() {
        // console.log(this.props)
        // console.log(this.state.name)
        const {
            name,
            songs
        } = this.state
        return (
            <div>
                <Head title={name} show={true}></Head>
                <div>
                    {
                        songs.map((song, index) => {
                            return (
                                <Link key={index} to={"/good/detail/" + song.sid + "?uid=" + song.urlid} >
                                    <h2 style={{ paddingLeft: 20, backgroundColor: "black", color: "white", fontSize: ".4rem", lineHeight: ".8rem" }}>
                                        {song.name}--{song.singer}
                                    </h2>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}