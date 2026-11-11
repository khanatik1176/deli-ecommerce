
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.CZ0dCDgn.js","/cdn/shopifycloud/checkout-web/assets/c1/app.B4TVSPW7.js","/cdn/shopifycloud/checkout-web/assets/c1/630ba094.BakaYx4j.js","/cdn/shopifycloud/checkout-web/assets/c1/4509beb0.BvoFMnzS.js","/cdn/shopifycloud/checkout-web/assets/c1/6a2fc6d6.CTGoW7Wk.js","/cdn/shopifycloud/checkout-web/assets/c1/f025431a.BlsbPO0-.js","/cdn/shopifycloud/checkout-web/assets/c1/6ec9a0fa.B3ZXEx93.js","/cdn/shopifycloud/checkout-web/assets/c1/164ad2e3.Ctt3cniE.js","/cdn/shopifycloud/checkout-web/assets/c1/fb3b4968.DyB0IaT-.js","/cdn/shopifycloud/checkout-web/assets/c1/7d6bf786.DMKXaHjX.js","/cdn/shopifycloud/checkout-web/assets/c1/0f5b1987.DNEiuUZD.js","/cdn/shopifycloud/checkout-web/assets/c1/9e5d8eb8.LM7m9FaB.js","/cdn/shopifycloud/checkout-web/assets/c1/a45fed45.zq7KXdE7.js","/cdn/shopifycloud/checkout-web/assets/c1/c328865d.BCB1O5to.js","/cdn/shopifycloud/checkout-web/assets/c1/f1384cc2.BX1JbjgR.js","/cdn/shopifycloud/checkout-web/assets/c1/4618373b.Nh0hEoaI.js","/cdn/shopifycloud/checkout-web/assets/c1/486c3fda.B2vOQBC1.js","/cdn/shopifycloud/checkout-web/assets/c1/17f6d6d8.3s2lhHBr.js","/cdn/shopifycloud/checkout-web/assets/c1/19286c78.DxZYI50u.js","/cdn/shopifycloud/checkout-web/assets/c1/cb6adac5.Bl30j75Z.js","/cdn/shopifycloud/checkout-web/assets/c1/c7b92b97.aLoSeuA9.js","/cdn/shopifycloud/checkout-web/assets/c1/faece749.CiaVR60z.js","/cdn/shopifycloud/checkout-web/assets/c1/77d9e668.BFXqJ4ms.js","/cdn/shopifycloud/checkout-web/assets/c1/2c7267bc.C0-8gLQW.js","/cdn/shopifycloud/checkout-web/assets/c1/b71b03d1.B5sMzgIT.js","/cdn/shopifycloud/checkout-web/assets/c1/928dbd30.DVJs5Dgw.js","/cdn/shopifycloud/checkout-web/assets/c1/77821758.CIHBOvKY.js","/cdn/shopifycloud/checkout-web/assets/c1/82d59f8f.Cb1P0PT8.js","/cdn/shopifycloud/checkout-web/assets/c1/a8202753.yZeFqMZx.js","/cdn/shopifycloud/checkout-web/assets/c1/dfb65aab.BUiH0I9O.js","/cdn/shopifycloud/checkout-web/assets/c1/e1177f6f.CJWO8gQH.js","/cdn/shopifycloud/checkout-web/assets/c1/2f5db8a5.CqA_Hn7J.js","/cdn/shopifycloud/checkout-web/assets/c1/c0466e46.BVX_HZW6.js","/cdn/shopifycloud/checkout-web/assets/c1/8d7e1337.D1SAQfdV.js","/cdn/shopifycloud/checkout-web/assets/c1/5bf177e7.DSPnXK34.js","/cdn/shopifycloud/checkout-web/assets/c1/f3089cd3.PvvllfKG.js","/cdn/shopifycloud/checkout-web/assets/c1/53e8828a.BBqPu4jB.js","/cdn/shopifycloud/checkout-web/assets/c1/4c5b1c9e.BgWkrnwK.js","/cdn/shopifycloud/checkout-web/assets/c1/a541bc81.Bsck7nCZ.js","/cdn/shopifycloud/checkout-web/assets/c1/6b0dea54.luiJ7A_T.js","/cdn/shopifycloud/checkout-web/assets/c1/9c33421f.BDHMvAk7.js","/cdn/shopifycloud/checkout-web/assets/c1/37c3ef79.CKSTlb1Q.js","/cdn/shopifycloud/checkout-web/assets/c1/651bb548.ZCvkfFcW.js","/cdn/shopifycloud/checkout-web/assets/c1/5f07060a.7-J-jOO5.js","/cdn/shopifycloud/checkout-web/assets/c1/83f74304.Bdh3A-u0.js","/cdn/shopifycloud/checkout-web/assets/c1/7edfee1d.CoI5tyMe.js","/cdn/shopifycloud/checkout-web/assets/c1/ce604576.DRj3vMAG.js","/cdn/shopifycloud/checkout-web/assets/c1/b01c110b.uWo-NoSm.js","/cdn/shopifycloud/checkout-web/assets/c1/f1754c88.Brd5q1On.js","/cdn/shopifycloud/checkout-web/assets/c1/5d731017._XammDAk.js","/cdn/shopifycloud/checkout-web/assets/c1/f00fed33.DfIuZtck.js","/cdn/shopifycloud/checkout-web/assets/c1/94493b3a.CQVwgjXq.js","/cdn/shopifycloud/checkout-web/assets/c1/99cd9b25.CLzJ5z8H.js","/cdn/shopifycloud/checkout-web/assets/c1/676eb8e9.DvhlSKXB.js","/cdn/shopifycloud/checkout-web/assets/c1/a9ee22a0.B29AgMCl.js","/cdn/shopifycloud/checkout-web/assets/c1/56132226.DduoEs0B.js","/cdn/shopifycloud/checkout-web/assets/c1/0e3247a0.CKTZcxeJ.js","/cdn/shopifycloud/checkout-web/assets/c1/1dbf806c.2zRDGS97.js","/cdn/shopifycloud/checkout-web/assets/c1/a56386a6.M3KP0d6x.js","/cdn/shopifycloud/checkout-web/assets/c1/674595ba.DWn6jG_9.js","/cdn/shopifycloud/checkout-web/assets/c1/173d1fdf.hcIQzqTw.js","/cdn/shopifycloud/checkout-web/assets/c1/0d85278a.DhRPihsP.js","/cdn/shopifycloud/checkout-web/assets/c1/16138b9e.CmpSu8KF.js","/cdn/shopifycloud/checkout-web/assets/c1/55432860.B6OmOMea.js","/cdn/shopifycloud/checkout-web/assets/c1/0be192b6.RoOnkx79.js","/cdn/shopifycloud/checkout-web/assets/c1/2bce9289.CtnuSIia.js","/cdn/shopifycloud/checkout-web/assets/c1/62a11d3e.DiGXR0AG.js","/cdn/shopifycloud/checkout-web/assets/c1/9a493f3d.DUPS2LtM.js","/cdn/shopifycloud/checkout-web/assets/c1/402b40d8.D_QC3IkN.js","/cdn/shopifycloud/checkout-web/assets/c1/17db3e71.DxViZmgd.js","/cdn/shopifycloud/checkout-web/assets/c1/b4f06cd6.CwW_AIzI.js","/cdn/shopifycloud/checkout-web/assets/c1/2b0d1656.RNKZGKow.js","/cdn/shopifycloud/checkout-web/assets/c1/64c3067d.DFfavTBt.js","/cdn/shopifycloud/checkout-web/assets/c1/bbe16958.DR4uzYXL.js","/cdn/shopifycloud/checkout-web/assets/c1/6a8181a5.CGNA00UW.js","/cdn/shopifycloud/checkout-web/assets/c1/4205169c.B-v2r6Fp.js","/cdn/shopifycloud/checkout-web/assets/c1/1befea5c.VEf0Bg-p.js","/cdn/shopifycloud/checkout-web/assets/c1/ff52cf6d.C-_S3LI1.js","/cdn/shopifycloud/checkout-web/assets/c1/74e5a557.BJ9p8GW_.js","/cdn/shopifycloud/checkout-web/assets/c1/f4d0afee.CBQgxqHw.js","/cdn/shopifycloud/checkout-web/assets/c1/0b704646.CxdYgLdL.js","/cdn/shopifycloud/checkout-web/assets/c1/a7ef2c81.CxRWz9n4.js","/cdn/shopifycloud/checkout-web/assets/c1/f0b3b291.DtVBu4Fc.js","/cdn/shopifycloud/checkout-web/assets/c1/114cc9d1.C_JEseqR.js","/cdn/shopifycloud/checkout-web/assets/c1/e7ae9e74.BN2CXa7H.js","/cdn/shopifycloud/checkout-web/assets/c1/91e796b6.Dk70y0pS.js","/cdn/shopifycloud/checkout-web/assets/c1/a222330e.DKgehTtH.js","/cdn/shopifycloud/checkout-web/assets/c1/c380a132.Dk_GpcZt.js","/cdn/shopifycloud/checkout-web/assets/c1/3839d836.BDAtvfy-.js","/cdn/shopifycloud/checkout-web/assets/c1/72fde58e.D_BoLuBg.js","/cdn/shopifycloud/checkout-web/assets/c1/8cad6ded.CNJDcInI.js","/cdn/shopifycloud/checkout-web/assets/c1/9e556116.uXFMRT6V.js","/cdn/shopifycloud/checkout-web/assets/c1/abf134e3.Bz2uwF4Q.js","/cdn/shopifycloud/checkout-web/assets/c1/e6a05f36.BMCoaeQS.js","/cdn/shopifycloud/checkout-web/assets/c1/8e6bd8e5.CwEJSiwf.js","/cdn/shopifycloud/checkout-web/assets/c1/a012ee00.hrWIGbIS.js","/cdn/shopifycloud/checkout-web/assets/c1/71b36506.pvsnO_IB.js","/cdn/shopifycloud/checkout-web/assets/c1/7aefefff.Cs_8mJ7s.js","/cdn/shopifycloud/checkout-web/assets/c1/e72406f8.BxE3Qvxg.js","/cdn/shopifycloud/checkout-web/assets/c1/bdb60128.CzWggXCQ.js","/cdn/shopifycloud/checkout-web/assets/c1/a0df1226.CA3Zborf.js","/cdn/shopifycloud/checkout-web/assets/c1/5d5cabdf.5N1wq5du.js","/cdn/shopifycloud/checkout-web/assets/c1/8efef14b.DyOdR0xl.js","/cdn/shopifycloud/checkout-web/assets/c1/c1adaf81.Cx57sSL5.js","/cdn/shopifycloud/checkout-web/assets/c1/21162507.ZBi71-Xy.js","/cdn/shopifycloud/checkout-web/assets/c1/139f607b.x2qffeWt.js","/cdn/shopifycloud/checkout-web/assets/c1/5f1fce8b.e4QsuNYD.js","/cdn/shopifycloud/checkout-web/assets/c1/bace9a08.B16b0SIR.js","/cdn/shopifycloud/checkout-web/assets/c1/8e2be3f2.0O2SV0if.js","/cdn/shopifycloud/checkout-web/assets/c1/2d034bf2.zkV7XcW3.js","/cdn/shopifycloud/checkout-web/assets/c1/972590c9.CpJmBxDc.js","/cdn/shopifycloud/checkout-web/assets/c1/9961965b.B08LIdpq.js","/cdn/shopifycloud/checkout-web/assets/c1/bc751930.Dh3XXtum.js","/cdn/shopifycloud/checkout-web/assets/c1/842452fd.C7jJUn3Y.js","/cdn/shopifycloud/checkout-web/assets/c1/a70a5b74.CMmmoDLE.js","/cdn/shopifycloud/checkout-web/assets/c1/2692118b.C7k9LR5p.js","/cdn/shopifycloud/checkout-web/assets/c1/c4303b96.Jg2VpDQe.js","/cdn/shopifycloud/checkout-web/assets/c1/7ee3a05c.nSsPmjUI.js","/cdn/shopifycloud/checkout-web/assets/c1/0d8691fc.QEbp6PIh.js","/cdn/shopifycloud/checkout-web/assets/c1/b0923a20.DRlndoes.js","/cdn/shopifycloud/checkout-web/assets/c1/7e9c6d7c.Kw0syV86.js","/cdn/shopifycloud/checkout-web/assets/c1/ea392d18.C9JaHvWy.js","/cdn/shopifycloud/checkout-web/assets/c1/b2ef26e8.rcn2y3KB.js","/cdn/shopifycloud/checkout-web/assets/c1/99bfe9cf.BdPHkOk6.js","/cdn/shopifycloud/checkout-web/assets/c1/1493337c.BSajMYMv.js","/cdn/shopifycloud/checkout-web/assets/c1/3c46c6f5.DdF3_kf0.js","/cdn/shopifycloud/checkout-web/assets/c1/e29daa9a.Dl7e_XPg.js","/cdn/shopifycloud/checkout-web/assets/c1/b2371320.Lq2uhMBB.js","/cdn/shopifycloud/checkout-web/assets/c1/a735741f.D180URp7.js","/cdn/shopifycloud/checkout-web/assets/c1/5a1effbb.C9TC-iMR.js","/cdn/shopifycloud/checkout-web/assets/c1/67e8c664.CgcHon1e.js","/cdn/shopifycloud/checkout-web/assets/c1/4bb32466.D0_P3145.js","/cdn/shopifycloud/checkout-web/assets/c1/ed37d3c3.4duzQiu6.js","/cdn/shopifycloud/checkout-web/assets/c1/30df5a02.CtD_9eBF.js","/cdn/shopifycloud/checkout-web/assets/c1/e32a8416.C4crlUsH.js","/cdn/shopifycloud/checkout-web/assets/c1/eb0f242a.DWYM7CpL.js","/cdn/shopifycloud/checkout-web/assets/c1/109c16d9.BmoTmGjg.js","/cdn/shopifycloud/checkout-web/assets/c1/05f561d4.BECUVZYc.js","/cdn/shopifycloud/checkout-web/assets/c1/69f8f26d.Cd8LP3-V.js","/cdn/shopifycloud/checkout-web/assets/c1/121bd940.CVLb0LrK.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.CGRs8DQS.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/deferred-boot.go7TNwtm.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.mSY95ESL.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/256cc32287.B1YSPUDc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/a50c8864f4.FGF5A5M9.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/7188aae948xccd7bc85.Bi1nHaU-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/90ea855f49.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/69c8bed031.BEvzDDvy.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/04c08e5c0e.CuRoM9zv.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/6e3faf45e1.Du9dByaI.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/6e3faf45e1x0e0212c9.ct4xfivv.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/0fde071d7ex9f0ef4a6.B0RErzdh.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/605b2a80c9xbaeb52f9.BAjucZ-8.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/621ec27e44.B5DPTpH4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/5caf6ce603.87JMHPUK.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/966e3f4d79.gzvCNwz_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/d4951797f3.CtjKurIY.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/df684aa9a8.Cl3P6dqs.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/f2a87b867b.Cl0Eyn3N.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/4d60858badxb036935a.xO_7ctnq.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/65db0eadda.qa_ACxP4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/5a34f22f1a.D7MQTDGO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/e8404cbaefx27591707.B68J3GgF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/7aa3c6599b.C5b9n-0_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/e07f74760d.DU0m5rdF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/e07f74760dxbaeb52f9.skObByU9.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/6559bc5a39x1573b800.vTcdVGq4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/89f3b0bff6.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/500596e378xe1c30c9c.CyQZvZOO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/bde15ff106x11e90a44.ak5YUtDE.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/04e578408ax11e90a44.CbGDlw5K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/04e578408ax6d8a6990.eanpcn-r.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/d34ebf45edx11e90a44.btyKOfco.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/81ca749d51x11e90a44.DrWvAMMF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/d455ee2f96x11e90a44.B0R8BMTd.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/d455ee2f96x670d76d4.BbxB_6wt.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/d455ee2f96x03fe6ed3.CVKcAbIN.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/d455ee2f96xd17a0c7b.BULdn7yC.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/343ea67e0bx11e90a44.s-Kd_X2E.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/401ac968b4x11e90a44.JBO5WNhc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/81ca749d51.DRJckcGa.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0714/8591/5296/files/Deli-Logo-150px-50px-Without-Background_ffb8fec0-3cf6-432b-88b7-3f88442fde73_x320.png?v=1775457641"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  