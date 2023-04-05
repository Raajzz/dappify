import React, { useState, useEffect, useContext } from "react";
import { TransactionContext } from "./context/TransactionContext";
import { FaPlay, FaPause } from "react-icons/fa";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userSongDetails, setUserSongDetails] = useState({});

  const { userPaid, setUserPaid } = useContext(TransactionContext);

  const handlePlayPause = (song) => {
    if (isPlaying && currentSong === song) {
      setIsPlaying(false);
      setCurrentSong(null);
    } else {
      setIsPlaying(true);
      setCurrentSong(song);
    }
  };

  const handlePlay = (song) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setCurrentSong(song);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setSongs(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/getuser?name=${userName}`
        );
        const data = await response.json();
        setUserSongDetails(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userName]);

  if (userPaid) {
    const newUserSongDetails = userSongDetails;
    newUserSongDetails.songsOwned.push({ currentSong, currSongHash });
    setUserSongDetails(newUserSongDetails);
    useEffect(() => {
      const updateUserSongDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/update/${userName}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUserSongDetails),
            }
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      updateUserSongDetails();
    }, [userSongDetails, userName]);

    setUserPaid(false);
  }

  const AudioPlayer = () => {
    const currSongName = currentSong.songName;
    const currSongHash = currentSong.songHash;
    const res = userSongDetails.songsOwned.find(
      (element) =>
        element.songName === currSongName && element.songHash === currSongHash
    );

    if (!res) {
      return alert(
        "You don't have access to that song yet, please make a payment to the artist and then enjoy the song!"
      );
    }

    return (
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
        <div className="mx-auto py-3 max-w-7xl">
          <audio
            src={currentSong.songUrl}
            autoPlay={isPlaying}
            onPlay={() => handlePlay(currentSong)}
            onPause={handlePause}
          />
          <div className="flex justify-center items-center">
            {isPlaying ? (
              <button className="mr-2" onClick={handlePause}>
                <FaPause />
              </button>
            ) : (
              <button className="mr-2" onClick={() => handlePlay(currentSong)}>
                <FaPlay />
              </button>
            )}
            <div className="font-bold text-lg">{currentSong.songName}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className=" px-28 py-20 grid grid-cols-3 gap-10">
        {songs.map((song, index) => (
          <div key={index} className="relative">
            <img
              src={song.songImgUrl}
              alt={song.songName}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-white bg-opacity-80 p-2">
              <div className="font-bold">{song.songName}</div>
              <div className="text-sm text-gray-500">{song.artistName}</div>
              <button
                className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
                onClick={() => handlePlayPause(song)}
              >
                {isPlaying && currentSong === song ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </div>
        ))}
      </div>
      {currentSong && <AudioPlayer />}
    </>
  );
};

export default Home;
