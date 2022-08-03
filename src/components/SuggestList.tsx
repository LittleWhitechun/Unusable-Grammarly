import React, { createRef, useContext, useEffect, useState } from "react";
import SuggestListItem from "./SuggestListItem";
import styled from "styled-components";
import { create } from "domain";
import { ContentContext } from "../context-manager";
const Errors = ["Misspelling", "SyntaxError", "FormatError"];

const imgSrc =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc0IiB2aWV3Qm94PSIwIDAgMTAwIDc0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBvcGFjaXR5PSIwLjE1Ij4KPHBhdGggZD0iTTkzLjQ5OSA3Mi42MTY5Qzk2Ljg3MTYgNzIuNjE2OSA5OS42MDU3IDY5Ljg5NCA5OS42MDU3IDY2LjUzNTJDOTkuNjA1NyA2My4xNzY1IDk2Ljg3MTYgNjAuNDUzNiA5My40OTkgNjAuNDUzNkM5MC4xMjYzIDYwLjQ1MzYgODcuMzkyMiA2My4xNzY1IDg3LjM5MjIgNjYuNTM1MkM4Ny4zOTIyIDY5Ljg5NCA5MC4xMjYzIDcyLjYxNjkgOTMuNDk5IDcyLjYxNjlaIiBmaWxsPSIjMjU0RUZGIi8+CjxwYXRoIGQ9Ik0wLjAzNDI1MzQgNjguODc0MkMwLjYzMTQwNyA2My4yOTQzIDEuODQ5MzMgNTcuNzk3NyAzLjY2NTYgNTIuNDg1N0M1LjQ2ODEzIDQ3LjE2MTMgNy45MDY1IDQyLjA3MTkgMTAuOTI4MyAzNy4zMjY5QzEyLjQ4MzcgMzQuOTA0NiAxNC4yNjA1IDMyLjYzMDYgMTYuMjM2MSAzMC41MzRDMTguMzA0OCAyOC4zMDg0IDIwLjcyNTQgMjYuNDM1MyAyMy40MDE5IDI0Ljk4ODhDMjQuODQ0MSAyNC4yMjk3IDI2LjM4MzQgMjMuNjcwMSAyNy45Nzc0IDIzLjMyNTJDMjkuNjM5NiAyMi45Njc1IDMxLjM1MTMgMjIuODk4MiAzMy4wMzcxIDIzLjEyMDNDMzMuNDYwOCAyMy4xNjg1IDMzLjg3MjMgMjMuMjUyOSAzNC4yODk5IDIzLjMzNzNDMzQuNzE1NCAyMy40MzY3IDM1LjEzNTUgMjMuNTU3NCAzNS41NDg4IDIzLjY5ODlDMzYuMzY2IDIzLjk3MzcgMzcuMTU0NSAyNC4zMjcgMzcuOTAzMSAyNC43NTM3QzM5LjMxNTYgMjUuNTc1NyA0MC41OTMzIDI2LjYwODMgNDEuNjkxOCAyNy44MTU2QzQzLjY1OTIgMzAuMDM5NCA0NS4yMzEyIDMyLjU4MTMgNDYuMzM5OSAzNS4zMzE4QzQ3LjQxNjQgMzcuOTEyNCA0OC4yODI2IDQwLjU3NSA0OC45MzAzIDQzLjI5NEM0OS41Nzc5IDQ1Ljk2NDEgNTAuMDU2IDQ4LjY0NjMgNTAuNDMxMyA1MS4zNDA1QzUwLjYwNjggNTIuNjkwNyA1MC43NjQxIDU0LjA0MDggNTAuODc5MSA1NS40MDlDNTAuOTMzNiA1Ni4wOTYxIDUwLjk3NiA1Ni43NzcyIDUxLjAwMDIgNTcuNDgyNEM1MS4wMDAyIDU3LjgzODEgNTEuMDAwMiA1OC4xOTM3IDUxLjAwMDIgNTguNTczNEM1MS4wMDAyIDU4Ljk1MzEgNTEuMDAwMiA1OS4yOTA3IDUwLjk1NzggNTkuNjQ2M0M1MC44NjIyIDYyLjYxOTggNTAuMDE3MiA2NS41MjE2IDQ4LjUwMDYgNjguMDg0NkM0Ny42ODIyIDY5LjQwNzggNDYuNjE4MiA3MC41NjM1IDQ1LjM2NTUgNzEuNDkwMUM0NC4wNjg2IDcyLjQzOTkgNDIuNTYyMyA3My4wNjY3IDQwLjk3MjQgNzMuMzE4NEMzOS4zODI2IDczLjU3IDM3Ljc1NTMgNzMuNDM5MSAzNi4yMjY2IDcyLjkzNjdDMzQuNzE4OCA3Mi40Mjc0IDMzLjM0NTQgNzEuNTg3IDMyLjIwNzkgNzAuNDc3NUMzMS4xMTYxIDY5LjM5NDkgMzAuMjE0IDY4LjEzNzkgMjkuNTM4OSA2Ni43NTg2QzI4Ljg5MDggNjUuNDE4NyAyOC40MjA4IDY0LjAwMDQgMjguMTQwOSA2Mi41Mzk0QzI3Ljg2NzUgNjEuMTI3MiAyNy43Mjk3IDU5LjY5MjIgMjcuNzI5MyA1OC4yNTRDMjcuNzI5MyA1Ni44Nzk3IDI3LjcyOTMgNTUuNTExNSAyNy44MTQgNTQuMTQ5M0MyNy45NzA1IDUxLjQxODIgMjguMjkxOSA0OC42OTkgMjguNzc2MyA0Ni4wMDYzQzI5Ljc1MzQgNDAuNjEyNiAzMS4zMTM5IDM1LjM0IDMzLjQzMDUgMzAuMjgwOEMzNS41NTY3IDI1LjE2NDYgMzguMjcgMjAuMzEwNCA0MS41MTYzIDE1LjgxNTFDNDQuODM5IDExLjMzMDcgNDguNzc5IDcuMTExNTUgNTMuODQ0NyAzLjkxMUM1Ni40ODMyIDIuMjE2MTIgNTkuNDEzMSAxLjAyMDc2IDYyLjQ4NzMgMC4zODQ5NzRDNjUuNjk1OCAtMC4xNzY1NTEgNjguOTgyNCAtMC4xMjMzNTcgNzIuMTcwOSAwLjU0MTY5MkM3NS4zODIzIDEuMjMxMzQgNzguNDIwNyAyLjU1OTggODEuMTA0IDQuNDQ3NDNDODMuNjk1NCA2LjI3NzIyIDg1Ljk5NjYgOC40ODM2NyA4Ny45MzA5IDEwLjk5MzJDOTEuNzMxNyAxNS44NzU0IDk0LjIzMTMgMjEuMyA5Ni4xMTM1IDI2Ljc3MjlDOTcuOTU2NyAzMi4yNDM2IDk5LjI0MDMgMzcuODg1OCA5OS45NDQ2IDQzLjYxMzRWNDMuNjczN0MxMDAuMTgxIDQ1LjU2OCA5OS42NTI4IDQ3LjQ3ODQgOTguNDc1MyA0OC45ODQ2Qzk3LjI5NzcgNTAuNDkwOCA5NS41Njc1IDUxLjQ2OTQgOTMuNjY1NCA1MS43MDUyQzkxLjc2MzMgNTEuOTQxIDg5Ljg0NSA1MS40MTQ2IDg4LjMzMjYgNTAuMjQxOUM4Ni44MjAyIDQ5LjA2OTEgODUuODM3NiA0Ny4zNDYxIDg1LjYwMDggNDUuNDUxOEM4NS41NjU2IDQ1LjE1NTYgODUuNTQ1NCA0NC44NTc5IDg1LjU0MDMgNDQuNTU5N0M4NS41NjI1IDM5LjcxNDkgODUuMDc3NyAzNC44ODA5IDg0LjA5MzggMzAuMTM2MkM4My4yMDk0IDI1LjU1NTIgODEuNTczNiAyMS4xNTA2IDc5LjI1MiAxNy4wOTg5Qzc2Ljk0MDEgMTMuMjgzNiA3My44NDc0IDEwLjMzNjIgNjkuOTM3NiA5LjAxNjJDNjguOTQyMyA4LjY3MTQgNjcuOTE0MSA4LjQyOTA0IDY2Ljg2OTEgOC4yOTI5MUM2NS44NTUyIDguMTM3OSA2NC44MjQ2IDguMTIzNyA2My44MDY3IDguMjUwNzFDNjEuNjMzMiA4LjU1MzA0IDU5LjUzNDMgOS4yNTE4NSA1Ny42MTUzIDEwLjMxMjFDNTMuNTA1OCAxMi40OTQgNDkuNzQ3MyAxNS44ODc0IDQ2LjUyMTUgMTkuNjk2N0M0My4yNTQ5IDIzLjU4NzIgNDAuNDgwMyAyNy44NjI1IDM4LjI2MDIgMzIuNDI2NkMzNS45NzY4IDM3LjAxMDMgMzQuMjQyMSA0MS44NDUyIDMzLjA5MTYgNDYuODMyMUMzMi41MjI1IDQ5LjMyODUgMzIuMTE4MiA1MS44NTk0IDMxLjg4MTEgNTQuNDA4NUMzMS43NjAxIDU1LjY4MDMgMzEuNjc1MyA1Ni45NTgxIDMxLjY0NTEgNTguMjM1OUMzMS41OTU5IDU5LjQ0NDcgMzEuNjYwNyA2MC42NTU1IDMxLjgzODggNjEuODUyM0MzMi4yMDc5IDY0LjE4NDkgMzMuMDg1NSA2Ni40MjcxIDM0LjY1OTEgNjcuOTcwMUMzNS4zOTUgNjguNzM4OCAzNi4zMDY1IDY5LjMxOSAzNy4zMTYgNjkuNjYxMUMzOC4zMjU2IDcwLjAwMzIgMzkuNDAzMiA3MC4wOTcyIDQwLjQ1NzEgNjkuOTM1MUM0MS41MjAzIDY5LjcxNjIgNDIuNTIzIDY5LjI2OTcgNDMuMzk1NiA2OC42MjY1QzQ0LjI2ODIgNjcuOTgzMyA0NC45OSA2Ny4xNTg4IDQ1LjUxMDggNjYuMjEwMUM0Ni42MzI4IDY0LjEzNzggNDcuMjE5MyA2MS44MTk5IDQ3LjIxNzUgNTkuNDY1NUM0Ny4yMTc1IDU5LjE2NDEgNDcuMjE3NSA1OC44NjI3IDQ3LjIxNzUgNTguNTU1M0M0Ny4yMTc1IDU4LjI0NzkgNDcuMjE3NSA1Ny45NTI2IDQ3LjE2OTEgNTcuNjYzM0M0Ny4xMjY3IDU3LjA2MDYgNDcuMDU0MSA1Ni40MDk2IDQ2Ljk4MTUgNTUuNzc2N0M0Ni44MzAyIDU0LjUxMSA0Ni42MzA0IDUzLjIzOTIgNDYuMzc2MyA1MS45NzM0QzQ1LjkwMTQgNDkuNDQ0NyA0NS4yNjY3IDQ2Ljk0ODQgNDQuNDc1OCA0NC40OTk1QzQzLjcyODcgNDIuMDk3NyA0Mi43NzA4IDM5Ljc2NjIgNDEuNjEzMSAzNy41MzE4QzQwLjU2NDkgMzUuNDMyMyAzOS4xODM0IDMzLjUxNTEgMzcuNTIxOCAzMS44NTRDMzYuNzgyMSAzMS4xNDI5IDM1LjkzNyAzMC41NDk0IDM1LjAxNjIgMzAuMDk0QzM0LjE2ODIgMjkuNjk0IDMzLjI1MjggMjkuNDU0OCAzMi4zMTY5IDI5LjM4ODhDMzAuMzEwNSAyOS4yNzQgMjguMzE4MSAyOS43ODM4IDI2LjYxNTcgMzAuODQ3NEMyNC42Njk3IDMyLjAzNDcgMjIuOTI4NiAzMy41MjY1IDIxLjQ1OTIgMzUuMjY1NUMxOS44OCAzNy4xMDgzIDE4LjQ3NDEgMzkuMDkxNiAxNy4yNTg5IDQxLjE5MDRDMTQuNzc1MyA0NS41MjAyIDEyLjgyNDUgNTAuMTMyMyAxMS40NDg4IDU0LjkyNjhDMTAuMDIxOCA1OS43MDcxIDkuMTI0NzQgNjQuNjI4NyA4Ljc3MzY5IDY5LjYwMzVDOC43NTU2IDcwLjE5IDguNjE5MTMgNzAuNzY2NyA4LjM3MjQxIDcxLjI5OTVDOC4xMjU2OSA3MS44MzIyIDcuNzczNzQgNzIuMzEwMSA3LjMzNzYxIDcyLjcwNDVDNi45MDE0OCA3My4wOTg5IDYuMzkwMDYgNzMuNDAxOCA1LjgzMzg2IDczLjU5NTFDNS4yNzc2NiA3My43ODg1IDQuNjg4MDcgNzMuODY4MyA0LjEwMDIzIDczLjgyOThDMy41MTIzOSA3My43OTE0IDIuOTM4MzIgNzMuNjM1NCAyLjQxMjMgNzMuMzcxM0MxLjg4NjI4IDczLjEwNzEgMS40MTkwNyA3Mi43NDAyIDEuMDM4NSA3Mi4yOTIzQzAuNjU3OTMxIDcxLjg0NDUgMC4zNzE4MDkgNzEuMzI0OSAwLjE5NzE5NSA3MC43NjQ2QzAuMDIyNTgxNyA3MC4yMDQzIC0wLjAzNjk2NzkgNjkuNjE0NyAwLjAyMjEzNzEgNjkuMDMwOUMwLjAyMzc1MTkgNjguOTc4NSAwLjAyNzgwMjkgNjguOTI2MiAwLjAzNDI1MzQgNjguODc0MloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMDE4Xzc1NzgpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xMDE4Xzc1NzgiIHgxPSItMi44MTAzMSIgeTE9IjM2Ljg0NDciIHgyPSI5OS45NjI4IiB5Mj0iMzYuODQ0NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkYwMEZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1NEVGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=";
const noErrorImgSrc =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDEyMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNzU5XzIyNjcpIj4KPHBhdGggZD0iTTU5LjY5NTggMTEyLjkwNEM4OC4yMTQxIDExMi45MDQgMTExLjMzMyA4OS43ODU1IDExMS4zMzMgNjEuMjY3M0MxMTEuMzMzIDMyLjc0OSA4OC4yMTQxIDkuNjMwMzcgNTkuNjk1OCA5LjYzMDM3QzMxLjE3NzYgOS42MzAzNyA4LjA1ODk2IDMyLjc0OSA4LjA1ODk2IDYxLjI2NzNDOC4wNTg5NiA4OS43ODU1IDMxLjE3NzYgMTEyLjkwNCA1OS42OTU4IDExMi45MDRaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTc1OV8yMjY3KSIvPgo8cGF0aCBkPSJNNC41ODUwOCA2OC4yODQ5QzQuMTEzMzIgNzIuNzE3OSA0LjU4NTA4IDc4LjAwODcgNy40MjM0NyA4NC44NjNDMTIuMDI0MiA5NS45MzE5IDIyLjQ4ODggMTAyLjUxMyAzNC4yNDM5IDEwMC4xNjJDNDQuMzE4NyA5OC4xNDY1IDU4LjM0MyA5My42MDQzIDcxLjc0NzMgODMuMzk3Qzg1LjAwMzYgNzMuMzE0NSA3OS42MjcgNjMuNjcyNSA3OS42MjcgNjMuNjcyNUM3OS42MjcgNjMuNjcyNSA4NS4xMTI3IDUzLjQxNDUgNzcuMzg1MSA0OS4zNTk3Qzc3LjM4NTEgNDkuMzU5NyA3OS45Mzg5IDM3LjIwMyA2OC43NTMgMzguNDAzOEM2OC43NTMgMzguNDAzOCA2NS44NiAyOS4yMDI0IDU2LjM3MDEgMzMuNjg2MkM0Ni44ODAyIDM4LjE2OTkgNDIuMzY5MiA0MC42NjEzIDQyLjM2OTIgNDAuNjYxM0M0Mi4zNjkyIDQwLjY2MTMgMzkuNTczNyAxOS40OTQyIDI4Ljc3MzggMjIuMTE0M0MyOC43NzM4IDIyLjExNDMgMjUuNTE0MyAyMi45ODM3IDI2LjI1MTIgMzEuMzg1OEMyNi45ODgxIDM5Ljc4NzkgMjguNDE5IDUwLjc4NjcgMjAuMTAyNyA1Ni4xMDg3QzE2LjczODUgNTguMjgyMiAxMy4wNTUgNTkuOTE2MSA5LjE4NTc3IDYwLjk1MTFDNi4xNDQ2MyA2MS43NDY1IDQuOTAwODkgNjUuMTc3NSA0LjU4NTA4IDY4LjI4NDlaIiBmaWxsPSIjRkVGRUZDIi8+CjxwYXRoIGQ9Ik04LjY2NzI0IDYwLjE1NThDOC42NjcyNCA2MC4xNTU4IDI0LjIwODIgNTcuNzA3MyAyNi40MzA2IDQ4LjY1OEMyOC42NTI5IDM5LjYwODYgMjQuMDA1NSAyNC43ODEyIDI2Ljk3NjQgMjMuMTE2M0MyOS45NDc0IDIxLjQ1MTUgMzYuOTkyNyAxOS44NjA4IDM5LjkzNjMgMzEuODY5NEM0Mi44OCA0My44Nzc5IDQxLjI4NTMgNTIuMTcwOSA0Ni41NjQ0IDQ5Ljc2MTNDNTEuMDU5OSA0Ny43MDY2IDUyLjU0MTQgNDUuODE5NiA1NC40OTA5IDQzLjQ0NTIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTQxLjY3NTIgNDEuNDcyNEM0MS42NzUyIDQxLjQ3MjQgNjEuMzg0MSAyNy40MzY0IDY2LjY1MTUgMzQuNzU0NkM3MS45MTg5IDQyLjA3MjggNTMuMTI2MiA1OS4yOTAzIDUzLjEyNjIgNTkuMjkwMyIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNNjguNzMzNSAzOC40MDRDNjguNzMzNSAzOC40MDQgNzUuNjgxMyAzNy42MjQyIDc2Ljk2NzkgNDQuNTk1NEM3OC4yNTQ2IDUxLjU2NjYgNjUuMTA3NSA2Mi4zMTU5IDYxLjA3MjEgNjYuMjY1NCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNNzYuMzgzMiA0OS4wNjM1Qzc2LjM4MzIgNDkuMDYzNSA4My4yMzc0IDUwLjMyNjcgODEuMzc3NiA1Ny45OTk3Qzc5LjUxNzkgNjUuNjcyNyA2My4wNTI5IDc3LjYzODQgNjMuMDUyOSA3Ny42Mzg0IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik03OS4xMTIzIDYyLjkwODdDNzkuMTEyMyA2Mi45MDg3IDg3LjMyMzQgNzIuODgyMSA2Ny42MjYyIDg2LjUwMDlDNDcuOTI5IDEwMC4xMiAyMy41Njg3IDEwMC43NCAyMy41Njg3IDEwMC43NCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMzguMjQwMiAxNi44OTc2TDQ2LjMyMjYgMy4yNzEiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI3LjM1ODQgMTQuNjI4NUwyMS42MjMyIDEuNzU0MzkiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTIxLjAzNDUgMjEuNDkwNUwxMy4xMDAyIDE2Ljk5OSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNOC4zNzA5MyAxNC4zNTk1TDQuNDA1NzYgMTIuMTEzOCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNOTEuOTY3IDc2LjE4NDRDOTQuNzA4OSA3Ni4zMDA1IDk3LjQzOTIgNzUuNzYzNyA5OS45MzMgNzQuNjE4MUMxMDIuNDI3IDczLjQ3MjYgMTA0LjYxMyA3MS43NTEgMTA2LjMxMSA2OS41OTUzQzExMi4xNzkgNjIuMTg3NCAxMDcuMTQ1IDYxLjExOTEgMTIwIDUyLjY3NDFDMTIwIDUyLjY3NDEgMTEyLjEyNCA0NS45MjkgMTA2LjI0NSA0Ni4zMzQ1QzEwMC4zNjUgNDYuNzQgOTcuOTEyOCA1MS43MzgzIDk3LjEyNTMgNTUuMjEyMkM5Ni4zMzc3IDU4LjY4NjIgOTkuOTQwMyA3MC41MTkzIDkxLjk2NyA3Ni4xODQ0WiIgZmlsbD0iI0I5RTcwMiIvPgo8cGF0aCBkPSJNNy44OTUyNSAzOS41MjY4QzQuMjQ5NzkgNDEuMTUyNyAxLjExNTA4IDQwLjg2NDEgMC4xODMyNDYgMzguMjAxMkMtMC43NDg1ODkgMzUuNTM4MyAxLjkxNDM1IDMzLjIyNjIgNy4wODAzOCAzMy4zNjI3QzEyLjI0NjQgMzMuNDk5MSAxNy40ODI2IDM0LjE2MiAxOC42MjUgMzYuMzI1OEMxOS43Njc0IDM4LjQ4OTcgMTMuOTg1MyAzNi44MDU0IDcuODk1MjUgMzkuNTI2OFoiIGZpbGw9IiNCOUU3MDIiLz4KPHBhdGggZD0iTTk4Ljg3OTcgMTUuMzczNUg5NS42MjgxVjE4LjYyNTJIOTguODc5N1YxNS4zNzM1WiIgZmlsbD0iI0ZGMDBGRiIvPgo8cGF0aCBkPSJNOTEuMzI1NiA0NS4zMTk4TDg4Ljk0MTMgNDcuNTMwOEw5MS4xNTIzIDQ5LjkxNTFMOTMuNTM2NiA0Ny43MDQxTDkxLjMyNTYgNDUuMzE5OFoiIGZpbGw9IiM0NEM3QjUiLz4KPHBhdGggZD0iTTguMDEyMTcgMjYuNjEzOEg0Ljc2MDVWMjkuODY1NEg4LjAxMjE3VjI2LjYxMzhaIiBmaWxsPSIjRkZBOTQwIi8+CjxwYXRoIGQ9Ik02Ny4xNzc4IDExLjk0NjJDNjcuMTc3OCAxMS45NDYyIDU3Ljk4ODIgMTcuMDE0OCA1NC4zMTE1IDIyLjgzMTlDNTQuMzExNSAyMi44MzE5IDUzLjY3OTkgMTMuODEzOCA1OC40NzU1IDUuNzE1ODJDNTguNDc1NSA1LjcxNTgyIDY0LjE0NDUgNS43MDgwMyA2Ny4xNzc4IDExLjk0NjJaIiBmaWxsPSIjRkZFNjAwIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xNzU5XzIyNjciIHgxPSI4LjA1ODk2IiB5MT0iOS42MzAzNyIgeDI9IjEyMS43OTkiIHkyPSIyMi44NDkxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2Qjg3RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDg2QkZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTc1OV8yMjY3Ij4KPHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMTIuOTA0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
const redPointImgSrc =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI0U1MzQzNCIvPgo8L3N2Zz4K";

const typeCNNames: { [key: string]: string } = {
  AllCount: "全部建议",
  Misspelling: "拼写错误",
  SyntaxError: "语法错误",
  FormatError: "格式错误",
};
interface todoItem {
  position: number[][];
  title: string;
  todo: string;
  replacement: string;
}
const StyledSuggestList = styled.div`
  width: 450px;
  padding: 0 15px;
  overflow: auto;
  height: 98.7vh;;
  min-height: 700px;
  border-radius: 5px;
  /* margin-top: 10px; */
  border: 1px solid #00000030;
  text-align: center;
  background-color: #fdfcff;
`;

const StyledSuggestListTitle = styled.div`
  font-weight: 700;
  line-height: 45px;
  padding: 0 0;
  text-align: left;
`;

const StyledSuggestTypesList = styled.div`
  padding: 0 15px;
  height: 450px;
  border-radius: 5px;
  margin-top: 10px;
`;

const StyledSuggestTypesListItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: #000000c7;
  padding: 0.375rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 10px;
  user-select: none;
  width: 128px;
  &:hover,
  &.active {
    background-color: #ebf3ff;
    color: #2579ff;
    font-weight: 700;
  }
  &:hover .StyledSuggestTypesListItemCount {
    background-color: #2579ff;
    color: white;
  }
`;

const StyledSuggestTypesListItemCount = styled.span`
  // mix-blend-mode: difference;
  border-radius: 5px;
  margin-left: 5px;
  padding: 0 7.5px;
  color: #4e5969;
  background-color: #f2f3f5;
  border-radius: 0.5rem;
  &:hover,
  &.active {
    background-color: #2579ff;
    color: white;
  }
`;
const StyledNoSuggestFill = styled.div`
  margin-top: 40%;
`;
const StyledNoSuggestFillText = styled.div`
  text-align: center;
  line-height: 100px;
  font-family: fantasy;
  color: black;
  font-size: 16px;
  font-weight: 700;
`;

const StyledScore = styled.span`
  cursor: pointer;
  font-size: 12px;
  color: rgb(78, 89, 105);
  line-height: 20px;
  font-family: Roboto-ThinItalic, sans-serif;
  font-style: normal;
  font-weight: 400;
`;
const SuggestList = (props: {
  content: todoItem[];
  setUnFoldItem: any;
  setDoReplaceProps: any;
  setListSelectedItem: any;
}) => {
  const { content, setUnFoldItem, setDoReplaceProps, setListSelectedItem } =
    props;
  const [suggestTypesCount, setSuggestTypesCount] = useState<{
    [key: string]: number;
  }>({
    AllCount: 0,
    Misspelling: 0,
    SyntaxError: 0,
    FormatError: 0,
  });
  const [showContent, setShowContent] = useState<todoItem[]>([]);
  const [curType, setCurType] = useState<string>("AllCount");

  const getShowContent = (type: string) => {
    if (type == "AllCount") {
      return content;
    } else {
      return content.filter((item) => item.todo == type);
    }
  };

  useEffect(() => {
    // 设置各类type数量 content改变时重新渲染
    const tmpSuggestTypesCount = suggestTypesCount;
    Object.keys(tmpSuggestTypesCount).forEach((type) => {
      tmpSuggestTypesCount[type] = content.filter(
        (item) => item.todo == type
      ).length;
    });
    tmpSuggestTypesCount.AllCount = eval(
      Object.values(tmpSuggestTypesCount).join("+")
    );
    setSuggestTypesCount(tmpSuggestTypesCount);
    setShowContent(getShowContent(curType));
  }, [content]);

  useEffect(() => {
    setShowContent(getShowContent(curType));
  }, [curType]);

  const allContent = useContext(ContentContext);
  if (allContent.allContent) {
    allContent.allContent = allContent.allContent.trim();
  }
  return (
    <>
      <StyledSuggestList className="suggest-list">
        <StyledSuggestListTitle>
          {`全部建议 `}
          <span className="text-gray-500 font-normal ml-2">
            {suggestTypesCount["AllCount"]}
          </span>
        </StyledSuggestListTitle>
        {showContent.length != 0 ? (
          showContent.map((item, idx) => {
            return (
              <SuggestListItem
                title={item.title}
                todo={item.todo}
                replacement={item.replacement}
                position={item.position}
                setUnFoldItem={setUnFoldItem}
                setDoReplaceProps={setDoReplaceProps}
                setListSelectedItem={setListSelectedItem}
              ></SuggestListItem>
            );
          })
        ) : allContent.allContent.length > 0 ? (
          <>
            <StyledNoSuggestFill>
              <img src={noErrorImgSrc}></img>
              <StyledNoSuggestFillText>
                当前没有错误，做的很棒！
              </StyledNoSuggestFillText>
            </StyledNoSuggestFill>
          </>
        ) : (
          <>
            <>
              <StyledNoSuggestFill>
                <img src={imgSrc}></img>
                <StyledNoSuggestFillText>
                  轻松开启智能英文写作
                </StyledNoSuggestFillText>
                <div
                  style={{
                    color: "#4e5969",
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                  }}
                >
                  根据你的写作内容，提供实时精准的拼写、语法、格式纠错建议
                </div>
              </StyledNoSuggestFill>
            </>
          </>
        )}
      </StyledSuggestList>
      <StyledSuggestTypesList>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '12rem',
          }}
        >
          <div>
            <img src={imgSrc} width="58" height="71"></img>
            <div>
              <StyledScore>暂无分数</StyledScore>
            </div>
          </div>
        </div>
        <div style={{ padding: ".25rem", marginBottom: ".75rem" }}>
          <img
            src={redPointImgSrc}
            style={{ display: "inline-block", marginRight: "0.5rem" }}
            alt="point"
          ></img>
          <span
            style={{
              fontSize: ".875rem",
              lineHeight: "1.25rem",
              color: "#86909c",
            }}
          >
            智能纠错
          </span>
        </div>
        {Object.keys(suggestTypesCount).map((type) => {
          return (
            <StyledSuggestTypesListItem
              onClick={() => setCurType(type)}
              className={type == curType ? "active" : ""}
            >
              {typeCNNames[type]}
              <StyledSuggestTypesListItemCount
                className={
                  "StyledSuggestTypesListItemCount " +
                  (type == curType ? "active" : "")
                }
              >
                {suggestTypesCount[type]}
              </StyledSuggestTypesListItemCount>
            </StyledSuggestTypesListItem>
          );
        })}
      </StyledSuggestTypesList>
    </>
  );
};

export default SuggestList;
