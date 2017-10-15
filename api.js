module.exports = {
    protocol: 'http',
    address: '88.99.175.131',
    //address: 'localhost',
    //port: null,
    //port: '8080',
    port: '8000',
    //basePath: '/v1',

    getEndpointUrl() {
        return this.protocol + '://' + this.address + (this.port ? (":" + this.port) : "");
	//return this.protocol + '://' + this.address + (this.port ? (':' + this.port) : '') + (this.basePath ? this.basePath : '');
    }
};