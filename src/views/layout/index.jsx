import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/joy/Divider";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import { Alert, Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { downLoadApi, getVideoInfo } from "../../utils/apis";
import { download } from "../../utils/download";
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar() {
  const [url, setUrl] = React.useState(
    "https://www.tiktok.com/@tylr.kellyyy/video/7486523269093477678?is_from_webapp=1&sender_device=pc"
  );
  const [error, setError] = React.useState("");
  const [videoInfo, setvideoInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // URL 验证的正则表达式
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

  const handlePasteText = () => {
    // 从剪贴板读取文本
    navigator.clipboard
      .readText()
      .then((text) => {
        setUrl(text); // 将剪贴板中的文本粘贴到输入框
      })
      .catch((error) => {
        console.error("读取剪贴板内容失败:", error);
      });
  };

  const handleChangeInput = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    // 校验 URL 是否符合正则表达式
    if (!urlRegex.test(url)) {
      setError("请输入有效的网址");
    } else {
      setError(""); // 清空错误消息
      // 这里可以进行其他操作，比如提交表单
      fetchData();
    }
  };

  const handleClear = () => {
    setUrl("");
    setvideoInfo(null);
  };

  const fetchData = async () => {
    setLoading(true); // 开始加载
    try {
      const response = await getVideoInfo(url);
      setvideoInfo({ ...response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 不管成功失败，结束加载
    }
  };

  const handleDownLoad = async () => {
    try {
      const res = await downLoadApi(url);
      console.log(res);
      download(res.data, videoInfo.fileName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {/* <Divider /> */}
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "none" }}>
        <Container>
          <Toolbar
            sx={{
              padding: "0 !important",
              display: "flex",
              justifyContent: "space-between",
              //   bgcolor: "red",
            }}
          >
            <Typography
              variant="h6"
              component="span"
              fontWeight={500}
              sx={{ color: "black" }}
            >
              TikSave
            </Typography>
            <Avatar
              alt="Remy Sharp"
              src="https://s21.ax1x.com/2025/04/28/pE7iPxO.jpg"
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />

      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            my: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // bgcolor: "red",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            fontWeight={500}
            sx={{ color: "black" }}
          >
            下载 Tiktok 视频
          </Typography>
          <span sx={{ color: "black" }}>免费下载无水印的Tiktok视频</span>
          <Box
            sx={{
              width: "100%",
              //   bgcolor: "red",
              display: "flex",
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              mt: "30px",
              "@media (max-width: 600px)": {
                flexDirection: "column",
                mt: "50px",
              },
            }}
          >
            <FormControl
              sx={{
                width: "100%",
                maxWidth: 800,
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "black", // 设置聚焦时的边框颜色为褐色
                  },
              }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      {!url ? (
                        <ContentPasteIcon onClick={handlePasteText} />
                      ) : (
                        <ClearIcon onClick={handleClear} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                error={Boolean(error)} // 如果有错误，显示错误样式
                aria-describedby="outlined-weight-helper-text"
                sx={{
                  height: 56,
                  borderRadius: "4px 0 0 4px",
                  "@media (max-width: 600px)": {
                    borderRadius: "4px",
                  },
                }}
                value={url}
                onChange={(e) => handleChangeInput(e)}
              />
            </FormControl>
            <Button
              sx={{
                height: 56,
                marginLeft: "0px",
                color: "white",
                borderRadius: "0px 4px 4px 0",
                p: "0 30px 0 30px",
                minWidth: "100px",
                fontWeight: 500,
                fontSize: 16,
                bgcolor: loading ? "#ccc" : "black", // loading时按钮变成褐色
                "@media (max-width: 600px)": {
                  width: "100%",
                  mt: "10px",
                  p: "30px 0 30px 0",
                  borderRadius: "4px",
                },
              }}
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              开始解析
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              //   "@media (max-width: 600px)": {
              //     mr: 4,
              //   },
            }}
          >
            {error && (
              <Alert
                sx={{
                  width: "100%",
                  maxWidth: 900,
                  mt: "0",
                  display: "flex",
                  justifyContent: "center",
                  "@media (max-width: 600px)": {
                    mt: "40px",
                    maxWidth: 800,
                  },
                }}
                severity="error"
              >
                链接格式错误。粘贴 Tiktok 网址并重试！
              </Alert>
            )}
          </Box>
        </Box>
      </Container>

      {videoInfo ? (
        <Container>
          <Box
            sx={{
              display: "flex",
              // bgcolor: "red",
              bgcolor: "#fff",
              borderRadius: "10px",
              boxShadow:
                "0 4px 10px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
              // justifyContent: "space-between",
              // alignItems: "center",
              p: "10px",
              "&:hover": {
                boxShadow:
                  "0 8px 12px rgba(0, 0, 0, 0.15), 0 9px 15px rgba(0, 0, 0, 0.15)",
              },
              "@media (max-width: 600px)": {
                flexDirection: "column",
                alignItems: "center",
                mt: "20px",
              },
            }}
          >
            <img
              style={{
                width: "168px",
                height: "168px",
                objectFit: "cover",
              }}
              src={videoInfo.thumbnail}
              alt=""
            />
            <Typography
              variant="h10"
              component="span"
              fontWeight={500}
              sx={{
                color: "black",
                ml: "10px",
                mr: "10px",
                flex: 1,
                //   bgcolor: "red",
                "@media (max-width: 600px)": {
                  width: "100%",
                  fontSize: "14px",
                  wordBreak: "break-word",
                  overflowWrap: "breakWord",
                  whiteSpace: "normal",
                  margin: "10px 0 10px 0",
                },
              }}
            >
              {videoInfo.title}
            </Typography>

            <Box>
              <Button
                onClick={handleDownLoad}
                sx={{
                  p: "10px 50px 10px 50px",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  bgcolor: "black", // loading时按钮变成褐色
                }}
              >
                <DownloadIcon sx={{ mr: "5px" }} />
                下载视频
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
