
 
      var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

      // is dom ready 
      DOMReady(function() { 

          //

      

             

        

            animation()

        
      
      });

      // BEGIN THE GREENSOCK ANIMATION
      function animation() {

          var t1 = new TimelineMax({repeat:0, onComplete:function(){
                                                console.log(this._totalDuration)
                                              }});
              t1.add(setup())
              t1.add(f1(),"=+0");
              t1.add(f2(),"=+0");
              t1.add(f3(),"=+0");
              t1.add(f4(),"=+0");
              t1.add(f5(),"=+0");
              t1.add(f6(),"=+0");
     
  
                     
            
         }

      
      function setup() {
        var t1 = new TimelineMax();
            //t1.set(['#bg_img_1','#bg_img_2'],{willChange: "transform", rotation: .001, force3D:true})
         
            return t1;

      }

      
      function f1() {

            var t1 = new TimelineMax();
              
                t1.to("#c1", .05, { autoAlpha: 1, scale:1.2, ease: Linear.easeNone },"=+0");
                t1.to("#c1", .05, { autoAlpha: 1, scale:1, ease: Linear.easeNone },"=+0.05");

                // t1.to("#c2", .05, { autoAlpha: 1, scale:1.2, ease: Linear.easeNone },"=+0.1");
                // t1.to("#c2", .05, { autoAlpha: 1, scale:1, ease: Linear.easeNone },"=+0.05");

                t1.to("#c3", .05, { autoAlpha: 1, scale:1.2, ease: Linear.easeNone },"=+0.1");
                t1.to("#c3", .05, { autoAlpha: 1, scale:1, ease: Linear.easeNone },"=+0.05")

                t1.to("#c4", .05, { autoAlpha: 1, scale:1.2, ease: Linear.easeNone },"=+0.1");
                t1.to("#c4", .05, { autoAlpha: 1, scale:1, ease: Linear.easeNone },"=+0.05")
                
                t1.to("#c5", .05, { autoAlpha: 1, scale:1.2, ease: Linear.easeNone },"=+0.1");
                t1.to("#c5", .05, { autoAlpha: 1, scale:1, ease: Linear.easeNone },"=+0.05")

                //hide
                t1.to(["#c1","#c2","#c3","#c4","#c5","#cta","#f1_boots"], .01, { autoAlpha: 0 , ease: Linear.easeNone },"=+1.0")


                return t1;    
      }

      
      function f2() {
              var t1 = new TimelineMax();
                  t1.to(["#black"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                  t1.to(["#f2_cap","#f2_bg"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0.05");

                     t1.to(["#black"], 0.1, { autoAlpha: 0.75, ease: Linear.easeNone },"=+0.4");
                     t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.1, { autoAlpha: 0.25, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 0, ease: Linear.easeNone },"=+0")


                  t1.fromTo("#f2_player", 0.9, { opacity: 0,y:5 }, { opacity: 1,y:0, ease: Power2.easeInOut})

                  t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0.7");
                  t1.to(["#f2_cap","#f2_bg","#f2_player"], 0.1, { autoAlpha: 0, ease: Linear.easeNone },"=-0.1");

                  
                  return t1;
      }

      function f3() {
              var t1 = new TimelineMax();
                 t1.to(["#black"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                  t1.to(["#f3_cap","#f3_bg"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0.05");

                     t1.to(["#black"], 0.1, { autoAlpha: 0.75, ease: Linear.easeNone },"=+0.4");
                     t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.1, { autoAlpha: 0.25, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 0, ease: Linear.easeNone },"=+0")


                  t1.fromTo("#f3_player", 0.9, { opacity: 0,y:5 }, { opacity: 1,y:0, ease: Power2.easeInOut})

                  t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0.7");
                  t1.to(["#f3_cap","#f3_bg","#f3_player"], 0.1, { autoAlpha: 0, ease: Linear.easeNone },"=-0.1");
                  

              return t1;
      }

         function f4() {
              var t1 = new TimelineMax();
                 t1.to(["#black"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                  t1.to(["#f4_cap","#f4_bg"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0.05");

                     t1.to(["#black"], 0.1, { autoAlpha: 0.75, ease: Linear.easeNone },"=+0.4");
                     t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.1, { autoAlpha: 0.25, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 0, ease: Linear.easeNone },"=+0")


                  t1.fromTo("#f4_player", 0.9, { opacity: 0,y:5 }, { opacity: 1,y:0, ease: Power2.easeInOut})

                  t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0.7");
                  t1.to(["#f4_cap","#f4_bg","#f4_player"], 0.1, { autoAlpha: 0, ease: Linear.easeNone },"=-0.1");
                  

              return t1;
      }

       function f5() {
              var t1 = new TimelineMax();
                 t1.to(["#black"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                  t1.to(["#f5_cap","#f5_bg"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0.05");

                     t1.to(["#black"], 0.1, { autoAlpha: 0.75, ease: Linear.easeNone },"=+0.4");
                     t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.1, { autoAlpha: 0.25, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 0, ease: Linear.easeNone },"=+0")


                  t1.fromTo("#f5_player", 0.9, { opacity: 0,y:5 }, { opacity: 1,y:0, ease: Power2.easeInOut})

                  t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0.7");
                  t1.to(["#f5_cap","#f5_bg","#f5_player"], 0.1, { autoAlpha: 0, ease: Linear.easeNone },"=-0.1");
                  

              return t1;
      }

         function f6() {
              var t1 = new TimelineMax();
                  t1.to(["#black"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                  t1.to(["#f1_boots"], .01, { autoAlpha: 1, ease: Linear.easeNone },"=+0.05");

                     t1.to(["#black"], 0.1, { autoAlpha: 0.75, ease: Linear.easeNone },"=+0.4");
                     t1.to(["#black"], 0.1, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.1, { autoAlpha: 0.75, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 1, ease: Linear.easeNone },"=+0");
                     t1.to(["#black"], 0.05, { autoAlpha: 0, ease: Linear.easeNone },"=+0")

                     t1.to(["#cta"], 0.2, { autoAlpha: 1, scale:0.9, force3D:true, ease: Linear.easeNone },"=-0.4");
                     t1.to(["#cta"], 0.2, { autoAlpha: 1, scale:1, force3D:true, ease: Linear.easeNone },"=+0");
                   

                  
                  

              return t1;
      }

  


