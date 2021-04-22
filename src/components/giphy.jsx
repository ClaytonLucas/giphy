import axios from "axios";
import React, { useEffect, useState } from "react";
const Giphy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const limite = 100;
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setLoading(true);
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "kyuWno7UydcARKZ22nI4LVID2vTvVTi3",
            limit: limite
          }
        });
        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (loading) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      );
    }

    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  const renderLoading = () => {
    if (loading) {
      return (
        <div className="loading">
          <h1>Loading..</h1>
        </div>
      );
    }
  };
  const renderError = () => {
    if (isError) {
      return <div>Unable to get Gifs, please try again in a few minutes</div>;
    }
  };

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    setVisible(10);
    event.preventDefault();
    setIsError(false);
    setLoading(true);

    const results = await axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "kyuWno7UydcARKZ22nI4LVID2vTvVTi3",
        q: search,
        limit: limite
      }
    });
    setData(results.data.data);
    setLoading(false);
  };
  const printGif = () => {
    const aux = [];
    for (let i = 0; i < visible; i++) {
      aux.push(<div>{renderGifs()[i]}</div>);
    }
    return aux;
  };
  const loadMore = () => {
    setVisible(visible + 10);
  };

  return (
    <div>
      {renderError()}
      <form className="header">
        <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={searchChange}
          className="form-control"
        />
        <button onClick={handleSubmit} type="submit" className="search-btn">
          <i class="fas fa-search search__icon"></i>
        </button>
      </form>
      {renderLoading()}
      <div className="container gifs">{printGif()}</div>
      {visible < data.length && (
        <div className="container btn">
          <button onClick={loadMore} className="load-btn">
            carregar mais gifs
          </button>
        </div>
      )}
    </div>
  );
};

export default Giphy;
