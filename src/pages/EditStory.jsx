import React, { useState, useEffect } from "react";
import "../../styles/Edit.css";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { instance } from "../config/api";
import axios from "axios";

const EditStory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { storyId } = useParams();
  const token = localStorage.getItem("token");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const getStory = async () => {
    try {
      const {
        data: { story },
      } = await instance.get(`/user/story/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setTags(story.tags);
      setTitle(story.title);
      setDescription(story.description);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStory();
  }, [storyId]);

  const [update, setUpdate] = useState(false)
  const redirect = useNavigate()
  
  const handleUpdate = async (e) => {
    e.preventDefault 
    setUpdate(true)
    try {
     const {data} = await axios.patch(`https://postit-west-api.onrender.com/api/user/story/${storyId}`,
     {title, description, tags},
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     })
      if (data.success) {
        //redirect to /mystories
        redirect('/mystories')
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Layout>
        <div className="task3">
          <div className="newTask">
            <h1>Update Story</h1>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="titleTask">
              <label htmlFor="taskTitle">Title</label>
              <input
                type="text"
                id="taskTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="tagS">
              <label htmlFor="tags">Tags</label>
              <select name="" id="tags" value={tags} onChange={(e) => setTags(e.target.value)}>
                <option value="">Tags</option>
                <option value="technology">Technology</option>
                <option value="nature">Nature</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="sport">Sports</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="descripTion">
              <label htmlFor="describe">Update your story.......</label>
              <textarea
                type="text"
                id="describe"
                placeholder="Write your story......."
                wrap="soft"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="Btndone my-2">
              <button type="submit" className="btnDone">
                {update ? 'updating story...' : 'update story'} 
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default EditStory;
