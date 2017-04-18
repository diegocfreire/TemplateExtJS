<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <title>admin</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >

    <link type="text/css" rel="stylesheet" href="resources/css/app.css" />
    <link rel="shortcut icon" href="resources/imagens/admin.ico">

    <link rel="stylesheet" href="js/extjs-4.2.2/resources/ext-theme-gray/ext-theme-gray-all.css"/>
    <script type="text/javascript" src="js/extjs-4.2.2/ext-all.js"></script>
    <script type="text/javascript" src="js/extjs-4.2.2/locale/ext-lang-pt_BR.js"></script>
</head>
<body>
<sec:authorize access="hasRole('ROLE_ADM') or hasRole('ROLE_EMP')" >
    <script type="text/javascript" src="js/app-adm/app-adm.js"></script>
</sec:authorize>
<sec:authorize access="hasRole('ROLE_FLOG')" >
    <h1>sai miseria</h1>
</sec:authorize>
</body>
</html>