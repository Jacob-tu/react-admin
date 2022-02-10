import React from "react";
import PropTypes from 'prop-types'
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeletePic } from "../../api/index";
import { BASE_IMG_URL } from "../../utils/constant";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class Pictures extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }
md
  constructor(props) {
    super(props)
    let fileList = []
    const {imgs} = this.props
    if(imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: BASE_IMG_URL + img
      }))
    }

    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ file, fileList }) => {
    // 上传完成后更新图片的name和url
    if (file.status === "done") {
      const { name, url } = file.response.data;
      file.name = name;
      file.url = url;
    } else if (file.status === "removed") {
      // remove图片
      reqDeletePic(file.name)
    }
    this.setState({ fileList });
  };

  // 得到图片name数组用于添加商品接口的参数
  getImgs = () => this.state.fileList.map((file) => file.name);

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          accept="image/*" // 只接收图片格式的文件
          action="/manage/img/upload" // 上传图片的接口地址
          listType="picture-card"
          fileList={fileList}
          name="image"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
