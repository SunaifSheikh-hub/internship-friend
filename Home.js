import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Navs from "./Navs";
import { Upload, message, Button } from "antd";
import { ProfileFilled, UploadOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox } from "antd";

import { doc, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db, storage } from "./Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import Posts from "./Posts/Posts";
import { Spin, Space } from 'antd';



const Home = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [already, setalready] = useState(false);
  const [loading, setLoadnig] = useState(false);
  const [uidState, setUidstate] = useState(null)
  const [postsData, setPostsData] = useState([])

  let uid = "";

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUidstate(user.uid)
        // onSnapshot(doc(db, "users", uid), (doc) => {
        //   console.log("Current data: ", doc.data());
        //   if (!already) {
        //     setData(doc.data());
        //     setalready(true);
        //   }
        // });
      }
    });
  }, [])

  useEffect(() => {
    console.log("Use Effect Run", uidState)
    const q = query(collection(db, "POST"), where("userUid", "==", `${uidState}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.unshift(doc.data());
        console.log(doc.data());
      });
      setPostsData(cities)
      console.log("Current cities in CA: ", cities);
    });
  }, [uidState])

  async function postSave(url) {
    const date = new Date;
    const timeId = date.getTime().toString()
    await setDoc(doc(db, "POST", timeId), {
      title: title,
      description: description,
      imageUrl: url,
      userUid: uidState,
    }).then(() => {
      console.log("data Submit successfully");
      setLoadnig(false)
    }).catch((err) => {
      console.log("Error", err);
      setLoadnig(false)
    })
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    setLoadnig(true);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("image uploaded", url);
          postSave(url);
        });
      }
    );
  };
  console.log(postsData);
  return (
    <div>
      <div>

        <Navs />
      </div>
      <div>
        <div></div>
        <div>
          
        </div>
      </div>

      <div className="homepage">
        <h1>{data.username}</h1>
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Post Title"
            name="post title"
            rules={[
              { required: true, message: "Please input your post titile!" },
            ]}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your post description!",
              },
            ]}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            {/* <Upload onChange={(e) => { console.log(e.target); }} name="logo" listType="picture" accept="image/*" multiple={false}
              maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>, */}
            <input type="file" onChange={handleChange} />
            <br />
            {loading
              ?
              <Spin size="large" />
              :
              <Button className="btn" type="primary" htmlType="submit" onClick={handleUpload}>
                Post
              </Button>
            }
          </Form.Item>
        </Form>
        {postsData.map((data, ind)=>{
          return <Posts key={ind} data={data} />
        })}
        {/* <Posts data={postsData} /> */}
      </div>
    </div>
  );
};

export default Home;
