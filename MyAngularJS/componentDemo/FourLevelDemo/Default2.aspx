<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default2.aspx.cs" Inherits="Default2" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:DropDownList ID="ddlTempCategory1" runat="server" OnSelectedIndexChanged="ddlTempCategory1_SelectedIndexChanged">
            </asp:DropDownList>
            <asp:DropDownList ID="ddlTempCategory2" runat="server" OnSelectedIndexChanged="ddlTempCategory2_SelectedIndexChanged">
            </asp:DropDownList>
            <asp:DropDownList ID="ddlTempCategory3" runat="server" OnSelectedIndexChanged="ddlTempCategory3_SelectedIndexChanged">
            </asp:DropDownList>
            <asp:DropDownList ID="ddlTempCategory4" runat="server">
            </asp:DropDownList>
        </div>
    </form>
</body>
</html>
