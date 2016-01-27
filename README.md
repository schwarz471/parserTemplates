パーサーテンプレート
====

Overview

RDFパーサーを利用するためのテンプレート例  
作例を参考にしてテンプレートを作成し、Web上に公開することで  
Web上に存在するオープンデータを、任意の形式(HTMLのtable、JSON、csv等)に変換し利用できる。  

## Description

RDFパーサーを利用して、Web上に存在するオープンデータを任意の形式で利用するためのテンプレート作例  
テンプレートとオープンデータがWeb上で、HTTPによりアクセス可能であれば、  
それぞれのURLをRDFパーサーに送信することで、テンプレートに記述した形式で、オープンデータを利用可能になる。  
ただし、オープンデータはRDF形式で公開されている必要がある。  

## Demo

- [新潟県のオープンデータリスト](http://linkdata.org/work/rdf1s3113i)を、HTMLの表形式で表示させる  
    http://parser-rdf.herokuapp.com/api/uri/rdfparse/RDFXML?RDF=http://linkdata.org/api/1/rdf1s3113i/niigata_pref_opendata_rdf.xml&html=https://raw.githubusercontent.com/schwarz471/parserTemplates/master/niigataSample.html

    利用オープンデータ  
    [新潟県のオープンデータリスト](http://linkdata.org/work/rdf1s3113i)  
    URL:http://linkdata.org/api/1/rdf1s3113i/niigata_pref_opendata_rdf.xml  
    利用テンプレート  
    https://github.com/schwarz471/parserTemplates/blob/master/niigataSample.html

- GPS座標からGoogleMapにマッピングする  
    http://schwarz471.github.io/parserTemplates/mappingGeo/

    テキストエリアにマッピングしたいオープンデータのURLを入力し、表示ボタンをクリックすることで、GoogleMapに場所情報がマッピングされる。  
    利用したいオープンデータに、

    - 何らかのnameプロパティ
    - http://www.w3.org/2003/01/geo/wgs84_pos#latプロパティ
    - http://www.w3.org/2003/01/geo/wgs84_pos#longプロパティ

    の３つのプロパティのデータが存在すれば、GoogleMap上にマッピングされる。  
    初期表示では、[鯖江市内AED設置場所](http://linkdata.org/work/rdf1s284i)がマッピングされる。  
    表示には時間がかかる場合あり。

## Requirement

WebAPI

- RDFパーサー http://parser-rdf.herokuapp.com/api/uri/rdfparse

## Usage

###テンプレートファイルの書き方

テンプレートは、以下の手順で記述することになる

1. パース領域を指定する
2. パース領域内にテンプレート構文を記述する

以下にサンプルコード全体を示す。

```
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>RDF/XML to HTML List Sample</title>
		<link href="css/listSample.css" rel="stylesheet" type="text/css" />
	</head>
	<body xmlns:imi="http://imi.ipa.go.jp/ns/core/rdf#">
		<div id="heder"></div>
		<div id="container">
			<div id="contents">
				<table>
						<tr>
							<td>名称</td>
							<td>年</td>
							<td>月</td>
							<td>日</td>
							<td>都道府県</td>
							<td>都道府県コード</td>
							<td>Webサイト</td>
						</tr>
				<%parse
					<tr>
						<td property="imi:名称">{*.名称}</td>
						<td property="imi:年">{*.年}</td>
						<td property="imi:月">{*.月}</td>
						<td property="imi:日">{*.日}</td>
						<td property="都道府県">{*.都道府県}</td>
						<td property="都道府県コード">{*.都道府県コード}</td>
						<td property="Webサイト">{*.Webサイト}</td>
					</tr>
				%>
				</table>
			</div>
		</div>
		<div id="footer"></div>
	</body>
</html>
```

パース領域は、 <%parse ～ %> で囲まれた部分が指定される。
サンプルにおいては、

```
<%parse
	<tr>
		<td property="imi:名称">{*.名称}</td>
		<td property="imi:年">{*.年}</td>
		<td property="imi:月">{*.月}</td>
		<td property="imi:日">{*.日}</td>
		<td property="都道府県">{*.都道府県}</td>
		<td property="都道府県コード">{*.都道府県コード}</td>
		<td property="Webサイト">{*.Webサイト}</td>
	</tr>
%>
```

がパースの対象領域となる。
この領域内にテンプレート構文を記述することで、指定した場所にデータが挿入されることになる。

テンプレート構文は、{type名.プロパティ名} と記述することで、構文が記述された場所に指定したデータを埋め込むことができる。
この type名 は、 * とすることで、全ての type を指定でき、サンプルコード

```
<td property="imi:名称">{*.名称}</td>
```

においては、RDFデータの内、全てのリソースの 名称 プロパティの値を {*.名称} の部分に埋め込む という構文になる。
また、RDFデータの内、Person type リソースの name プロパティのデータを指定する場合は、 {Person.name} という構文になる。

特殊構文として、以下のものが存在する。

- 構文文字のエスケープ
- データの最終行のみ出力させない文字の指定

構文文字には、中括弧{}が利用されているが、パース領域内で中括弧{}を利用したい場合、
\{ \}のように、文字の直前に\を付ける必要がある。
2016/01/27 現在、中括弧以外の文字は自由に利用可能である。

JSONのテンプレートを記述する場合等、データの最終行のみ出力させたくない文字列が存在する場合、
\?L ～ \? の間に指定した文字に関しては、最終行のみ出力されなくなる。

```
<%parse
	\{
		"name": "{*.name}", "lat": "{*.lat}", "long": "{*.long}"
	\}\?L,\?
%>
```

上記のようにテンプレートを記述することで、データの最終行以外は 

```
{"name": "hoge", "lat": "111", "long": "11" },
```

のように出力され、データの最終行では、

```
{"name": "hoge", "lat": "111", "long": "11" }
```

のように、カンマ(,)が出力されなくなる。
変換例は以下のようになる。

```
{
	"data":[
		{"name": "hoge", "lat": "111", "long": "11" },
		{"name": "hogehoge", "lat": "112", "long": "12" },
		{"name": "hogehogehoge", "lat": "113", "long": "13" }
	]
}
```

### オープンデータのパース

任意のオープンデータをテンプレートの形式にパースするには、

- オープンデータのフォーマット
- オープンデータのURL
- テンプレートのURL

をRDFパーサーに送信することで、テンプレートに記述した形式で、オープンデータを利用可能になる。  
ただし、以下の条件が必要になる。

- オープンデータはRDF形式で公開されていること
- オープンデータがWeb上で、HTTPによりアクセス可能であること
- テンプレートファイルがWeb上で、HTTPによりアクセス可能であること

RDFパーサーの対応フォーマットと、リクエスト時に指定するフォーマット文字列は以下になる。

|対応フォーマット|指定文字列|
|-----------|--------|
|RDF/XML    |RDFXML  |
|Turtle     |TURTLE  |
|JSON-LD    |JSONLD  |
|N3         |N3      |
|NTriple    |NTRIPLE |

RDFパーサーへは、  
http://parser-rdf.herokuapp.com/api/uri/rdfparse/{オープンデータのフォーマット}?html={テンプレートのURL}&RDF={オープンデータのURL}
に対してHTTP GETリクエストを送信するか

http://parser-rdf.herokuapp.com/api/uri/rdfparse/{オープンデータのフォーマット}  
に対して、以下のパラメータをHTTP POSTリクエストで送信するかで利用可能である。

|パラメータ名|値説明|
|--------|-----|
|http    |利用するテンプレートのURL|
|RDF     |利用するオープンデータのURL|

## Licence

以下のものは[MITライセンス](https://github.com/tcnksm/tool/blob/master/LICENCE)である。  
本家サイトが配布しているライブラリのため、そちらを参照

- gh-pages*ブランチ mappingGeo/libs/jquery/dist/jquery.min.js

上記のもの以外はパブリックドメインのため、修正・再配布等は自由に行ってよい。

## Author

schwarz471