<% function echoItem(item) { %>
<%_ if (item.userdoc) echo(item.userdoc); %>
<%_ if (item.devdoc) echo(item.devdoc); %>
<% if (item.inputs && item.inputs.length > 0) { %><table>
<tr><th colspan="3">Arguments</th></tr>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<% for (var j = 0; j < item.inputs.length; j++) { %><tr>
  <td><%= item.inputs[j].name %></td>
  <td><%= item.inputs[j].type %></td>
  <td><%= item.inputs[j].userdoc %>
  <%= item.inputs[j].devdoc %></td>
</tr><% } %>
</table><% } %>
<% } %># <%= contractName %>

## <%= title %>

<%= userdoc %>

<%= devdoc %>

```
Author: <%= author %>
Last update: <%= updatedAt %>
Compiler: <%= compiler.name %> <%= compiler.version %>
```

## API
<% for (var typeName in apiList) { %>
### <%= typeName %>
<% for (var i = 0; i < apiList[typeName].length; i++) { %>
#### <%= apiList[typeName][i] %><% const item = api[apiList[typeName][i]];%>
<% echoItem(item) %>
<% } %>
<% } %>
