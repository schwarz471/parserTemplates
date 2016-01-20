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

RDFパーサーに対して、

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