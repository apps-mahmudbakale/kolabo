window.addEventListener('load', (event) => {
    var peer = new Peer();
    var myStream;

    var peerList = [];

    peer.on('open', function(id) {
        document.getElementById('show-peer').innerHTML = id
    })

    peer.on('call', function(call) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            myStream = stream
            addOurVideo(stream)
            call.answer(stream)
            call.on('stream', function(remoteStream) {
                if (!peerList.includes(call.peer)) {
                    addRemoteVideo(remoteStream)
                    peerList.push(call.peer)
                }

            })
        }).catch((err) => {
            console.log(err + ' Unable to get media')
        })
    })
    document.getElementById('call-peer').addEventListener('click', (e) => {
        let remotePeerId = document.getElementById('peerID').value;
        document.getElementById('show-peer').innerHTML = "Connecting" + remotePeerId;
        callPeer(remotePeerId);

    })

    function callPeer(id) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            myStream = stream
            addOurVideo(stream)
            let call = peer.call(id, stream)
            call.on('stream', function(remoteStream) {

                if (!peerList.includes(call.peer)) {
                    addRemoteVideo(remoteStream)
                    peerList.push(call.peer)
                }
            })
        }).catch((err) => {
            console.log(err + " unabale to get media")
        })
    }

    function addRemoteVideo(stream) {
        let video = document.createElement('video');
        video.classList.add('video');
        video.srcObject = stream;
        video.play();

        document.getElementById('remote-video').append(video);
    }

    function addOurVideo(stream) {
        let video = document.createElement('video');
        video.classList.add('video');
        video.srcObject = stream;
        video.play();

        document.getElementById('our-video').append(video);
    }
});