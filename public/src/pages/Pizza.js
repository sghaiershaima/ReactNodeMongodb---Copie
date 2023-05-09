import React from "react";




export default function Pizza(){

  const styles = {
    img :{
      display: 'block',
      margin: '0 auto',
      maxWidth: '60%',
      height: 'auto',
      objectFit: 'contain',
      animationName: 'move-image',
      animationDuration: '2s',
      animationIterationCount: 'infinite'
      

    },
    body:{
      height: '100%',
      width: '100%'
    },
    h1: {
      color: 'black',
      fontSize: '24px',
      textAlign: 'center',
      margin: '0 auto',
      textAlign: 'center',
      fontWeight: 'bold',
     fontStyle: 'italic'

    },
    h:{
      textAlign: 'center'

    },
    h5:{
      fontWeight: 'bold'



    },
     right: {
      height: '100%',
      width: '50%',
      display: 'inline-block',
      verticalAlign:'top' ,
    },
    p:{
      fontWeight: 'bold',
      textShadow: '2px 2px 2px #333',
      fontSize: '24px'
    



    },
    p2:{
      fontWeight: 'bold',
      fontSize: '18px'
    



    },
  }





    return (
        <div style={styles.body} >
        <style jsx>{`
        .animated-image {
          animation-name: move-image;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }
      
        @keyframes move-image {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(50px);
          }
          100% {
            transform: translateX(0);
          }      `}
          
          </style>
      <h2 style={styles.h1}> Chicken Pan Pizza</h2>
       <br/>
            <img src="/img/gallery/img_1.jpg"  class="animated-image" style={styles.img} 
             />
            <br/>
    <main  style={styles.h} >
     <div style={styles.right} >
               

        
            <h4  style={styles.p}>instructions</h4>
            <br/>
              <header>
                <p style={styles.h5}>step 1</p>
                <br/>

              </header>
              <p>
              Préchauffez le four à 220 °C.
              </p>
           
              <header>
                <p style={styles.h5}>step 2</p>
              </header>
              <p>
              Étalez la pâte à pizza et déposez-la sur une plaque allant au four recouverte de papier sulfurisé.
              </p>
                <br/>

        
              <header>
                <p style={styles.h5}>step 3</p>
              </header>
              <p>
              Nappez de coulis de tomates et étalez.

              </p>
            <header>
              <p style={styles.h5}>step 4</p>
            </header>
            <p>
            Coupez le jambon en carrés et disposez-les sur la pizza.  
            </p>
          <header>
            <p style={styles.h5}>step 5</p>
          </header>
          <p>
          Parsemez de gruyère râpé.

          </p>
        <header>
          <p style={styles.h5}>step 6</p>
        </header>
        <p>
        Salez, poivrez et enfournez durant 15 à 20 min.
        </p>

        </div>
        <div style={styles.right} >

        
        <h4  style={styles.p}>ingredients</h4>
        <br/>
        <p class="single-ingredient">1 1/2 cups dry pancake mix</p>
        <p class="single-ingredient">1/2 cup flax seed meal</p>
        <p class="single-ingredient">1 cup skim milk</p>
  <br/>
        <h5 style={styles.p2}>prep time</h5>
        <p>30 min.</p>
        <br/>

        <h5 style={styles.p2}>cook time</h5>
        <p>15 min.</p>
    
        <h5>serving</h5>
        <p>6 servings</p>
    

<br/> 
           
              <h4>tools</h4>
              <p class="single-tool">Hand Blender</p>
              <p class="single-tool">Large Heavy Pot With Lid</p>
              <p class="single-tool">Measuring Spoons</p>
              <p class="single-tool">Measuring Cups</p>
       </div>
    </main>
    <footer class="page-footer">
    
    </footer>
    


        </div>
        )}