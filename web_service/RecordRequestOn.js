//gio vat ne
//ong lam zay nha
//button ban dau se la "Begin recording data"
//khi client bam vo, no se gui tin hieu (*)
var request = new XMLHttpRequest();
var port = 9094;
var ip_addr = "";
/*TODO: Get ip address from server
//lay ip address cua server ma post len client la sao ???
//y t la client thuc hien download a, sau khi download xong file do thi server xoafile tren may minh di
//noi chung zay a :v hong hieu :() muon download file thi phai co csdl luu file chu
//download file thi dung POST method a, cai do cua thang http a
*/
request.open('POST', 'http:/' + ip_addr + ":" + port.toString(), true); // bat dau set configuration o day, cho nay la de post file download f k
//cai post o day chi la tin hieu thui, gio ong lam post sao cho no gui file nguoc lai tu server xuong client
//thi de lam cai nay thi ong phai mo vo DataProducer.java, hay dai loai 1 module rieng
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
var file_location = "Stop";
//o cho nay, t muon 2 loai tin hieu
//neu tin hieu la record data thi server tao file tren server minh
//neu tin hieu la save data, thi server se post len client, sau khi post xong se xoa file.
//Ngoai ra, o tin hieu: record data, phai gui qua DataProducer.java ip cua client
///thui ong chiu kho coi giup t nha @@ chung nao xong t nhay qua, chu hok la hok ki pdau
//KHoi hinh nhu xong phan cua no roi con test thui ong hoi no coi sao. ua @@ 
//t con p2p chua lam j het a @@ KHoi thi sao @@ tai phan login logout tk Bao lam ma hqua tui moi nhac no cai may ao :( thay no hope qua cohope :v y la so tk Bao lam k  :)no chua clone project ve nua ba ua zay may ngay nay no lam j zay????? chac coi database :
//eh deo hieu lam :| ong co ai khac lam phu tui phan nay ko tai tui con phan login logout hien thi user ben tk Bao nua
if(file_location == "Stop"){ //(*)
    request.send("-1");
}else{
    request.send('{"file_location" : "' + file_location + '","ip_addr" : "' + ip_addr + '"}');
}