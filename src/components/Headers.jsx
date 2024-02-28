import React, { useState } from "react";
import ModeSelect from "./ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
    Badge,
    Box,
    Button,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TrelloIcon from "../assets/trello.svg?react";
import SvgIcon from "@mui/material/SvgIcon";
import Workspace from "./AppBar/Menus/Workspace";
import Recent from "./AppBar/Menus/Recent";
import Starred from "./AppBar/Menus/Starred";
import Templates from "./AppBar/Menus/Templates";
import Profiles from "./AppBar/Menus/Profiles";
import { AccountCircle } from "@mui/icons-material";
function Headers() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    translate: "0px 1px",
                }}
            >
                <AppsIcon sx={{ color: "white" }}></AppsIcon>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        translate: "0px 1px",
                    }}
                >
                    <SvgIcon
                        component={TrelloIcon}
                        fontSize="small"
                        inheritViewBox
                        sx={{ color: "white" }}
                    />
                    <Typography
                        variant="span"
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Trello
                    </Typography>
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            gap: 1,
                        }}
                    >
                        <Workspace></Workspace>
                        <Recent></Recent>
                        <Starred></Starred>
                        <Templates></Templates>
                        <Button
                            sx={{
                                color: "white",
                                border: "none",
                                "&:hover": {
                                    border: "none",
                                },
                            }}
                            variant="outlined"
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <TextField
                    sx={{
                        minWidth: "120px",
                        maxWidth: "170px",
                        "& label": { color: "white" },
                        "& label.Mui-focused": { color: "white" },
                        "& input": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "white",
                            },
                            "&:hover fieldset": {
                                borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "white",
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <CloseIcon
                                fontSize="small"
                                sx={{
                                    color: searchValue
                                        ? "white"
                                        : "transparent",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSearchValue("")}
                            />
                        ),
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    id="outlined-search"
                    label="Search..."
                    type="text"
                    variant="outlined"
                    size="small"
                />
                <ModeSelect />
                <Tooltip title="Notification">
                    <Badge
                        sx={{
                            cursor: "pointer",
                            position: "relative",
                            zIndex: "1",
                        }}
                        color="warning"
                        variant="dot"
                    >
                        <NotificationsNoneIcon sx={{ color: "white" }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon
                        sx={{ cursor: "pointer", color: "white" }}
                    />
                </Tooltip>
                <Profiles></Profiles>
            </Box>
        </>
    );
}

export default Headers;
