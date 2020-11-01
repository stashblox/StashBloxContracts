<% function echoItem(item) { -%>
<% if (item.userdoc) echo(item.userdoc + "<br />"); %><% if (item.devdoc) echo(item.devdoc + "<br />"); -%>
<% if (item.inputs && item.inputs.length > 0) { %>
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<% for (var j = 0; j < item.inputs.length; j++) { %><tr>
  <td><%= item.inputs[j].name %></td>
  <td><%= item.inputs[j].type %></td>
  <td><%= item.inputs[j].userdoc %>
  <%= item.inputs[j].devdoc %></td>
</tr><% } %>
</table><% } -%>
<%_ if (item.outputs && item.outputs.length > 0) { %>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<% for (var j = 0; j < item.outputs.length; j++) { %><tr>
  <td><%= item.outputs[j].name %></td>
  <td><%= item.outputs[j].type %></td>
  <td><%= item.outputs[j].userdoc %>
  <%= item.outputs[j].devdoc %></td>
</tr><% } %>
</table><% } -%>
<% } -%>
# <%= contractName %>

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
<% echoItem(item) -%><% } -%><% } -%>
