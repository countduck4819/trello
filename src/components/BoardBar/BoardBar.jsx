import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import FilterListIcon from "@mui/icons-material/FilterList";
import BoltIcon from "@mui/icons-material/Bolt";
import { Box, Button, Chip, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MENU_STYLE = {
    color: "#1976d2",
    bgcolor: "white",
    border: "none",
    paddingX: "5px",
    borderRadius: "4px",
    "& .MuiSvgIcon-root": {
        color: "#1976d2",
    },
    "&:hover": {
        bgcolor: "primary.50",
    },
    cursor: "pointer",
};
function BoardBar({ user }) {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                    sx={MENU_STYLE}
                    icon={<DashboardIcon />}
                    label="Countduck2003"
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<VpnLockIcon />}
                    label="Public/Private Worrkspace"
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<AddToDriveIcon />}
                    label="Add To Google Drive"
                />

                <Chip sx={MENU_STYLE} icon={<BoltIcon />} label="Automation" />

                <Chip
                    sx={MENU_STYLE}
                    icon={<FilterListIcon />}
                    label="Filters"
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                            borderColor: "white",
                        },
                    }}
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                >
                    Invite
                </Button>
                <AvatarGroup
                    max={3}
                    total={8}
                    sx={{
                        gap: "12px",
                        "& .MuiAvatar-root": {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            "&:first-of-type": {
                                bgcolor: "#a4d0be",
                            },
                        },
                    }}
                >
                    <Tooltip title="trungquandev">
                        <Avatar
                            alt="countduck2003"
                            src="https://portfolio.countduck2003.id.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffacebook.5e0c6973.jpg&w=384&q=75"
                        />
                    </Tooltip>
                    <Tooltip title="trungquandev">
                        <Avatar alt="countduck2003" src={user.picture} />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </>
    );
}

export default BoardBar;
