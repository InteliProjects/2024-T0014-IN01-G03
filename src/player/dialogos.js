const dialogs = {
  //Dialogo em português
  pt: {
    //dialogo da cena do predio
    dialogo_cena_predio: [
      `Olá, Tyler seja bem-vindo ao seu \nprimeiro dia de trabalho na Meta. \nPara começar, entre no prédio e \nconverse com a Vanessa. `

    ],

    //dialogo da cena do escritorio
    dialogo_cena_escritorio: [
      `Olá, Tyler. Seja bem-vindo!`,
      `Me chamo Vanessa, sou do time de Diversity \nSupply da Meta.`,
      `Hoje é o grande dia do seu treinamento!`,
      `Juntamente com o time de Inovação, estamos testando \numa nova forma de treinamento para ensinar sobre \nas etapas do processo de contratação de fornecedores.`,
      `Esse treinamento é imersivo e ocorre totalmente \nno Metaverso.`,
      `Sua imersão será para no reinado da Meta, quando entrar \n no Metaverso, procure o castelo para começar \no aprednizado do processo de contratação.`,
      `Então, para começar, se aproxime do Meta Quest`,

    ],

    //dialogo da cena do escritorio na volta
    dialogo_cena_escritorio_volta: [
      `Bem-vindo de volta, Tyler.`,
      `Para resumir, a última etapa do \nprocesso de contratação, é a finalização do contrato.`,
      `Aqui você decide como vai proceder em relação\nao fornecedor.`,
      `Você pode desejar manter relações \ncom ele para serviços futuros e acompanhá-lo, ou \npode optar por se desvincular totalmente dele. `,
      `Porém, a equipe de desenvolvimento \nme informou que essa parte ainda não está pronta \nno treinamento. `,
      `Então, por hoje é só. Até mesmo \nporque seu expediente acabou`,
      `Tchau!`
    ],

    //dialogo da cena exterior para o npc 1 (dono da loja)
    dialogo_cena_exterior_npc1: [
      `Olá, sou o proprietário da loja`,
      `Continue andando para entrar \nno castelo.`,
    ],

    //dialogo da cena exterior para o npc 2(guarda)
    dialogo_cena_exterior_npc2: [
      `Olá, sou o Guarda`
    ],

    //dialogo da cena exterior para o quadro de informacoes
    dialogo_cena_exterior_informacao: [
      `Castelo logo à frente!`
    ],

    //dialogo da cena corredor com o npc 
    dialogo_cena_corredor_npc: [
      `Você está no castelo do rei. Siga \nem frente e converse com o rei!`
    ],

    //dialogo da cena corredor com o banner
    dialogo_cena_corredor_banner: [
      `Esse parece ser o brasão do reino!`
    ],

    //texto de boas vindas na cena do castelo
    texto_boasvindas_castelo: [
      "Bem-vindo a Sala do Rei"
    ],

    //dialogos para a etapa 1
    dialogo_cena_castelo: [
      `Tyler, você chegou! Que maraviha! `,
      `Sei que deve estar um pouco confuso, então deixe-me explicar\no que está acontecendo...`,
      `Preciso da sua ajuda. Após anos de pesquisa o reino da Meta \nconseguiu desenvolver um óculos que consegue ajudar nas tarefas do \ndia a dia através da realidade aumentada. Decidimos chamá-lo \nde Hiperglasses.`,
      `Iremos anunciar nossa criação em um evento, aqui no castelo:\nA Meta Connect`,
      `Esse evento é um grande festival com pessoas de vários reinos. \nMas, para isso,preciso de sua ajuda para contratar fornecedores \nque prestem serviços durante nosso evento...`,
      `Precisamos de 4 fornecedores, sendo um de comida, decoração, \ncorreios e de brindes`,
      `mas antes...`,
      `É imprescindível que os fornecedores contratados sigam os \nnossos valores e princípios. Não podemos nos filiar a \npessoas que tenham histórico de infração dos direitos humanos. \nPor isso, evite empresas que tenham envolvimento com escândalos \ndessa natureza ou com ações antiéticas. `,
      `Também é importante pensar na diversidade das empresas \nque contratamos. Aqui valorizamos a pluralididade de visões, \nentão evite as empresas não tenham diversidade.`,
      `O lançamento do Hiperglasses é uma grande novidade, \nportanto, precisamos garantir que nenhuma informação vaze antes da hora.  \nPeça aos fornecedores que assinem o NDA, um acordo de \nconfidencialidade que garante a segurança das \ninformações que trocaremos com eles.`,
      `Sua primeira tarefa é escolher as melhores perguntas para \nserem  enviadas para alguns fornecedores, para que possamos entender \nos valores dessas empresas. Para isso vá à sala da  escriba \ne converse com ela.`,
    ],

    //dialogos para a etapa 1
    dialogo_cena_escriba: [
      `Olá Tyler.`,
      `Reuni alguns documentos com perguntas \nque usamos em solicitações anteriores. \nAlgumas são muito antigas e não condizem \nmais com os princípios do reino.`,
      `Escoha àquelas que considerar mais \nadequedas de serem enviadas aos \nfornecedores.`,
      `Confirme suas escolhas após escolher \nas 4 perguntas que comporão o RFP.`,
      `Após finalizar volte a falar comigo.`,
    ],

    //dialogos para o minigame 3
    dialogo_minigame3: [
      `Sejam bem-vindos! Começaremos \nnossa sessão de negociações.`, //0
      `Este é Tyler, e ele irá mediar \nnossa discussão.`, //1
      `Todos estão cientes dos nossos prazo? \nSó para assegurar, todos conseguirão \nentregar os serviços dentro do combinado?`, //2
      `Sim!`, //3

      `Ótimo. Preciso informar que nossos \npagamentos serão feitos 60 dias \napós o serviço, existe algum problema \nquanto a isso?`, //4
      `Nenhum`, //5
      `Então vamos começar a tratar das \nquantidades de produtos...`, //6

      `Gizmo, qual a sua proposta?`, //7
      `300 quilos de comida`, //8
      ` `, //9

      `Ótimo`, //10
      `Que tal 500 quilos`, //11
      `Por mim está bom.`, //12
      `Ótimo!...`, //13

      `Aysla, qual a sua proposta?`, //14
      `Posso enviar uma carta\n por familia`, //15
      ` `, //16
      `Ótimo`, //17

      `Não pode enviar uma carta\n individual?`, //18
      `Hum... que tal uma carta\n para cada duas pessoas`, //19

      ` `, //20
      `Perfeito`, //21
      `Preciso que seja individual`, //22
      `Uma para duas`, //23
      ` `, //24
      `Ok, uma para duas então`, //25
      `Individual`, //26
      `Ok, tudo bem!`, //27
      `Ok`, //28
      `Perfeito!`, //29

      `Romeo, qual a sua proposta?`, //30
      `Um brinde por convidado`, //31
      ` `, //32
      `Perfeito`, //33
      `Que tal dois para cada`, //34
      `Combinado!`, //35
      `Perfeito`, //36
      `Celeste, qual a sua proposta?`, //37
      `300 itens de decoração`, //38
      ``, //39
      `Perfeito`, //40
      `Que tal 500`, //41
      `No máximo 400.`, //42
      ` `, //43
      `Ok`, //44
      `Preciso de 500.`, //45
      `Só posso 400`, //46

      ` `, //47
      `Ok`, //48
      `Essa quantidade é suficiente, Tyler.`, //49
      ` `, //50
      `Ok, combinado`, //51
      `Com os últimos detalhes ajustados, peço \nque vão a sala de minha escriba para \nassinar os contratos!` //52
    ],

    //dialogos para a etapa 1
    dialogo_cena_escriba2: [
      `Você foi eficiente, Tyler, parabéns!`,
      `Acredito que você conseguiu concluir o \ndocumento com maestria, agora leve-o para o \nRei para que ele diga o que você deve fazer \na seguir.`,

    ],

    //dialogos para a etapa 1
    dialogo_cena_castelo2: [
      `Obrigado, Tyler! Pedirei que sejam feitas cópias desta carta \ne as enviarei às empresas da região. Também enviarei uma \ndescrição detalhada de tudo que precisamos para o evento.  Em breve \nteremos respostas, venha amanhã para analisar o que obtivermos.`,
    ],

    //depois dessa dialogo td fica preto (a tela) para mostar que a passagem de tempo.
    dialogo_cena_castelo3: [ //dialogos para a etapa 1
      `Olá, Tyler, tenho ótimas notícias! Recebemos diversas respostas \nde empresas das terras próximas.`,
      `Contudo, muitos deles não estão de acordo com a confidencialidade \nda nossa proposta ou não estão alinhados aos interesses e valores do \nnosso reino.`,
      `Por isso, veja as respostas que recebemos e selecione as mais \napropriadas para a contratação. As respostas lhe esperam na sala \nda escriba.`,
    ],

    //dialogos para a etapa 1
    dialogo_cena_escriba3: [
      `Olá, Tyler! Imagino que o rei já tenha lhe \navisado, mas recebemos várias respostas,\n7, para sermos mais precisos.`,
      `Bom, essa pilha de fichas não vão se analisar \nsozinhas, então é bom começar.`,
      `Leia todas as fichas e escolha aquelas que \natendam os valores do reino.`,
      `Quando terminar de escolher volte a falar\ comigo.`,
    ],

    //dialogos para a etapa 1
    dialogo_cena_escriba4: [
      `Uau, continua supreendendo, Tyler.`,
      `Tenho certeza de que você fez escolhas \nexcelentes! Agora se apresse e leve as fichas \nescolhidas para que o Rei possa analisá-las`,

    ],

    //depois desse dialogo vai aparecer na tela o resumo da etapa 1 
    dialogo_cena_castelo4: [ //dialogo etapa 1
      `Olá, Tyler, vejo que já escolheu algumas das fichas dos fornecedores!`, `Irei analisar cuidadosamente os perfis das empresas que você escolheu. \nFarei essa revisão junto aos meus conselheiros, isso tudo \npara que possamos evitar vieses e manter certa imparcialidade`,
      `Volte amanhã, pois já terei uma resposta e poderemos seguir para a próxima \netapa!`,

    ],

    //tela preta para mostrar passagem de tempo
    dialogo_cena_castelo6: [ //dialogo etapa 2
      `Que bom vê-lo de volta! Concluí minha revisão. Meus conselheiros \ntambém fizeram as suas e tudo está nos conformes! Todos \nserão cadastrados no sistema interno do reino.`,
      `Também entrarei em contato com a equipe responsável pelos contratos \ndo castelo. Quando eles estiverem prontos enviarei aos fornecedores.`,
      `Pedirei que venham ao castelo para que possamos discutir alguns pontos \nmais específicos da prestação de serviços. Lhe avisarei quando eles \nvierem, então você poderá me ajudar no momento das negociações!`,
      `Te vejo em breve`,

    ],

    //tela com o resumo da etapa 2 
    dialogo_cena_castelo7: [ //dialogo etapa 3
      `Olá, Tyler. Os nossos fornecedores chegarão muito em breve, mas antes \ngostaria de realizar um breve alianhamento sobre o que faremos.`,
      `Iremos tratar de aspectos específicos do contrato, como, o prazo de entrega \ndo serviço, prazo de pagamento e negociar um preço justo pelos \nserviços. Lembre-se que toda negociação é sobre saber moderar entre \nser firme e ceder.`,
      `Acredito que você fará um ótimo trabalho. Aguarde aqui até \nque nossos fornecedores cheguem ao castelo.`,
    ],//talvez colocar dialogo da etapa 3, a continuação da negociação

    dialogo_cena_castelo8: [ //dialogo etapa 4
      `Parabéns, Tyler! Você escolheu bem nossos fornecedores, \nos contratos já estão assinados e a ordem de compra foi emitida!`,
      `O evento será um sucesso!`,
    ],
    //Tela escurece e volta com os fornecedores na sala do trono

    //resumo da etapa 3


    dialogo_cena_castelo9: [ //dialogo etapa 4
      `Tyler, recebemos atualizações dos nossos fornecedores. Todos \nestarão presentes e a preparação para o evento corre a \ntodo vapor! Quase tudo está finalizado. O evento será grandioso!  \nLhe espero lá.`,
      `Quando chegar, me procure, para conversamos.`,



    ],

    //tela preta - cena do evento - explicação etapa 4


    dialogo_cena_castelo10: [ //etapa 6/7
      `O evento foi maravilhosa, Tyler! Já encaminhei o ordem de pagamento \nà equipe responsável do castelo.`,
      `Muito obrigado por todo o apoio que você nos deu durante todo esse \nprocesso, Tyler.`,
      `Espero que tenha ficado tudo claro. Até a próxima!!`,

    ],

    dialogo_guarda_rei: [
      `A escriba saiu!\nFale com o Rei.`
    ],

    dialogo_quadrado_invisivel: [
      `Caminho fechado.\nFale com o rei!.`
    ],

    //tela em preto, volta para o escritorio
    dialogo_cena_escritorio2: [
      `Bem-vindo de volta, Tyler.`,
      `Bom, a última etapa do processo de contratação é a \nfinalização do contrato. Aqui você decide como vai \nproceder em relação ao fornecedor.`,
      `Você pode desejar manter relações com ele para \nserviços futuros e acompanhá-lo, ou pode optar por se \ndesvincular totalmente dele.`,
      `Então, por hoje é só. Espero que você tenha \ngostado`,
      `Até amanhã`,


    ],

    //texto para a cena do castelo, impedindo que o personagem volte 
    faleComRei: [
      `Fale com o Rei!`
    ],

    //Todos os textos falando etapa
    texto_etapa1: [
      `etapa 1 - sourcing`,
    ],

    texto_etapa2: [
      `etapa 2 - onboarding`,
    ],

    texto_etapa3: [
      `etapa 3 - contracting`,
    ],

    texto_etapa4: [
      `etapa 4 - goods/\nservice delivery`,
    ],

    texto_etapa5: [
      `etapa 5 - invoicing &\n payments`,
    ],

    //dialogo do rei na cena do meta connect
    dialogo_cena_metaConnect_rei: [
      `Olá Tyler, gostou do evento?`,
      `Espero que sim!`,
      `Você realmente fez ótimas escolhas \nreferente aos fornecedores!`,
      `Todos estão elogindo os fornecedores \nescolhidos.`,
      `Parabêns pelo trabalho!`,
      `Te espero depois na minha sala \npara finalizarmos seu treinamento.`,
    ],

    //dialogos para os npcs na cena do meta connect
    dialogo_loja_festa: [
      'Quer comprar alguma coisa?'
    ],

    dialogo_gizmo_festa: [
      'Essa festa está surreal!'
    ],

    dialogo_romeu_festa: [
      'Você contratou ótimos fornecedores',
    ],

    dialogo_celeste_festa: [
      'Olá!'
    ],

    dialogo_aysla_festa: [
      'Como você tá?',
    ]
  },
  //Dialogo em inglês
  en: {
    dialogo_cena_predio: [
      `Hi Tyler. Welcome to Meta. Hope \nyou're excited for your first day \nwith us. Get into the building to \nreach Vanessa.`
    ],
    dialogo_cena_escritorio: [
      `Hello, Tyler, Welcome!`,
      `My name is Vanessa, I'm belong to Meta's Diversity \nSupplier team.`,
      `You're supposed to start your training today!`,
      `With the Innovation team we're testing a new way to \nexplain how the process of hiring suppliers is.`,
      `We count on an immersive training that happens in \nMetaverse.`,
      `You role will be in Kingdom's world. When you get \ninto Metaverse look for the castle to start the first step.`,
      `To start, go to the Meta Quest!`
    ],

    dialogo_cena_exterior_npc1: [
      "Hello, I'm the store owner.",
      "Keep walking to get into the castle",

    ],

    dialogo_cena_exterior_npc2: [
      "Hi, I'm the guard of the castle"
    ],

    dialogo_cena_exterior_informacao: [
      "The castle is up ahead!"

    ],

    dialogo_cena_corredor_npc: [
      "You are in the king's castle. Keep going\n straight and talk with the king."

    ],

    dialogo_cena_corredor_banner: [
      "This seems to be the emblem \n of the kingdom!"
    ],

    texto_boasvindas_castelo: [
      "Welcome to the King's room"
    ],

    dialogo_cena_castelo: [


      "How great! You've arrived.",
      `I know it may sound a little bit confused so let me explain what's happening...`,
      `After years of research, the Kingdom's Meta was able to develop a glasses \nwhich can help with the everyday tasks, thought augmented reality. We've \ndecided to call it Hiperglasses.`,
      `We are going to announce our launch during the event in the castle, called \nMeta Connect.`,
      `It´s a hide festival with people from all Kingdom’s.`,
      `But to make it happen, I need your help to hire suppliers to supply our \nevent.`,
      `We need 4 suppliers: food, decorative, mailing and gifts suppliers.`,
      `But before...`,
      `It's essential that the hired suppliers follow our values and principles. We can't \naffiliate with individuals who have a history of human rights violations. \nTherefore,  avoid companies that have been involvedin scandals of this \nnature or engaged unethical actions.`,
      `It's also important to consider the diversity of the companies we contract.\nHere we value a plurality of views, so please avoid companies that \nlack diversity.`,
      `The launch of the Hiperglasses is a big news, so we need to ensure that \nno information leaked ahead of time. Ask the suppliers to sign the NDA, \na confidentiality agreement that ensures the security of the information \nwe exchange with them.`,
      `Your first task is to choose the best questions to be sent to some suppliers \nso that we can understand the values of their companies. To do this, go \nto the scribe's room and talk to her.`,
    ],
    dialogo_cena_escriba: [
      `Hi, Tyler. I've gathered some documents with \nquestions we have used in previous requests. \nSome of them are very old and no longer align \nwith the principles of the Kingdom.`,
      `Choose the ones that you consider most \nimportant to send to the suppliers.`,
      `Confirm your selection, after choosing the \n4 questions that will compose the RFP.`,
      `When you finish choosing, come back and let \nme know.`,

    ],
    dialogo_minigame3: [
      `Welcome everyone! We will beggin \nour negotiation session.`, //0

      `This is Tyler, and he will\n mediate our discussion.`, //1
      `Everyone is aware of our deadline. But \n I would like to confirm, can everyone deliver\n the services within the agreed time?`, //2
      `Yes!`, //3
      `Great, I also need to inform you that our \npayments will be made 60 days after the\n service, is there any problem with that?`, //4

      `None`, //5
      `So let's start discussing the 
      quantities of products...`, //6
      `Gizmo, what is your proposal?`, //7
      `300 kilograms of food`, //8
      ` `, //9
      `Great`, //10

      `How about 500 kilograms`, //11
      `That works for me.`, //12
      `great!...`, //13
      `Aysla, what is your proposal?`, //14
      `I can send one letter 
      per family`, //15
      ` `, //16
      `Great`, //17
      `Can't you send an individual letter?`, //18
      `Hmm... how about one \nletter for every two people`, //19
      ` `, //20
      `Perfect`, //21

      `I need it to be individual`, //22
      `One for two`, //23
      ` `, //24
      `Ok, one for two then`, //25
      `Individual`, //26
      `Ok, that's fine!`, //27
      `Ok`, //28
      `Perfect!`, //29

      `Romeo, what is your proposal?`, //30
      `One souvenier per guest`, //31

      ` `, //32
      `Perfect`, //33
      `How about two for each`, //34
      `Agreed!`, //35
      `Perfect`, //36
      `Celeste, what is your proposal?`, //37

      `300 decoration items`, //38
      ` `, //39
      `Perfect`, //40
      `How about 500`, //41
      `Maximum 400.`, //42
      ` `, //43
      `Ok`, //44
      `I need 500.`, //45
      `I can only do 400`, //46

      ` `, //47
      `Ok`, //48
      `This quantity is enough, Tyler.`, //49
      ` `, //50
      `Ok, agree`, //51
      `With the last details adjusted, please \ngo to my scribe room to sign the \ncontracts!` //52
    ],
    dialogo_cena_escriba2: [ //dialogo etapa 1
      `You were very efficient Tyler, congratulations`,
      `I belive you've sucessfully completed the \ndocuments with mastery. Now take it to the \nKing for him to say what you should do next.`,

    ],
    dialogo_cena_castelo2: [
      `Thank you, Tyler! I'll request copies of this letter to be made and send them \nto the companies in the area. I'll also send a detailed description of \neverything we need for the event. Soon we'll responses, come \ntomorrow to analyze what we have obtained.`

    ],
    dialogo_cena_castelo3: [ //dialogo etapa 1
      `I've great news! We've received several responses from companies in the \nnearby lands.`,
      `However, many of them aren't in agreement with confidentiality of our \nproposal, or aren't aligned with the interests and values of our \nkingdom.`,
      `Therefore, please review the responses we have received and select those \nmost appropriate for hiring. The responses await you in the scribe's room.`,
    ],

    dialogo_cena_escriba3: [ //dialogo etapa 1
      `I imagine the King has already \ninformed you, but we've received several \nresponses, 7,to be more precise.`,
      `Well, this stack of cards won't be analyzed \nthemselves, so it's best to started.`,
      `Read thorugh all the cards and choose the \nones that align with the kingdom's values.`,
      `When you finish choosing, come back \nand let me know.`,


    ],

    dialogo_cena_escriba4: [ //dialogo etapa 1
      `Wow, congratulations Tyler.`,
      `I'm sure you've made excellent choices! \nNow hurry and take the selected cards \nso that the King can analyze them.`,

    ],

    dialogo_cena_castelo4: [ //dialogo etapa 1
      `Hello, Tyler, I see you've already chosen some of the supplier cards!`,
      `I'll carefully review the profiles of teh companies you selected. \nI'll do this review with my advisors, to ensure that we avoid \nbiases and maintain a level of impartiality.`,
      `Come back tomorrow, I will have an answer \nand we can move on to the next step!`,

    ],
    //depois desse dialogo vai aparecer na tela o resumo da etapa 1 
    dialogo_cena_castelo5: [ //dialogo etapa 2


    ],
    dialogo_cena_castelo6: [ //dialogo etapa 2
      `It's good to see you back! I have completed my review. My advisors \nhave also done theirs, and everything is in order! All of them will be \nregistered in the kingdom's internal system.`,
      `I’ll also get in touch with the responsible team for the castle's \ncontracts. Once they are ready, I'll send them to the suppliers.`,
      `I’ll ask them to come to the castle so that we can discuss some more \nspecific points of the service provision. I’ll let you know when they \ncome, so you can help me during the negotiations!!`,
      `See you soon`,

    ],
    //tela com o resumo da etapa 2 

    dialogo_cena_castelo7: [ //dialogo etapa 3
      `Hello, Tyler. Our suppliers will arrive very shortly, but first, \nI'd like to have a brief alignment about what we'll do.`,
      `We’ll address specific aspects of the contract, such as the service \ndelivery deadline, payment terms, and negotiate a fair price for the \nwork. Remember that every negotiation is about knowing how to \nmoderate between being firm and yielding!`,
      `I believe you'll do a great job. Wait here until our suppliers arrive at the castle.`,

    ],//talvez colocar dialogo da etapa 3, a continuação da negociação

    //Tela escurece e volta com os fornecedores na sala do trono

    //resumo da etapa 3

    dialogo_cena_castelo8: [ //dialogo etapa 4
      `Congratulations, Tyler! You’ve made good choices, the contracts are \nalready signed, and the purchase order has been issued.`,
      `The event will be a success!`,

    ],

    //tela preta - cena da festa - explicação etapa 4


    dialogo_cena_castelo9: [ //etapa 6/7
      `Tyler, we have received updates from our suppliers. Everyone will be \npresent. And the preparation for the event is in full swing! Almost \neverything is finalized. The event will be grand! I'll see you there`,
      `When you arrive, look for me so we can talk.`,


    ],

    dialogo_cena_castelo10: [
      `The event was wonderful, Tyler! I've already already forwarded thep\npayment order to the responsible team at the castle.`,
      `You're very welcome for all the support you provided us throughout \nthis process, Tyler.`,
      `I hope you've understood!`,
      `Until next time!`,

    ],
    dialogo_guarda_rei: [
      `The scribe has left!\nTalk with the king.`
    ],
    dialogo_quadrado_invisivel: [
      `The path is closed.\nTalk with the king!.`
    ],
    //tela em preto, volta para o escritorio
    dialogo_cena_escritorio_volta: [
      `Welcome back, Tyler.`,
      `To summarize, the contract finalization is the \nlast step in the hiring process.`,
      `Here, you’ll decide how to proceed with the \nsupplier.`,
      `You can either keep contact with them \nfor future hiring or you can completely \ndisassociate yourself from them.`,
      `You may wish to maintain relations with \nhim for future services and accompany \nhim, or you may choose to disassociate yourself \nfrom him completely.`,
      `But  that´s it for today. The development team \nhas informed,  that this part of the training \nis not ready. yet.`,
      `So, that is all for today. See you tomorrow`,


    ],
    dialogo_cena_metaConnect_donoLoja: [
      `Did you like anything from the\n store?`
    ],
    dialogo_cena_metaConnect_rei: [
      `Hello Tyler, did you enjot the event?`,
      `I hope so!`,
      `You really made great choices related to \nthe suppliers!`,
      `Everyone is praising the chosen suppliers.`,
      `Congratulations on the job!`,
      `I'll see you later in my room to finalize \nyour training.`,
    ],


    //Todos os textos falando etapa
    texto_etapa1: [
      `step 1 - sourcing`,
    ],

    texto_etapa2: [
      `step 2 - onboarding`,
    ],

    texto_etapa3: [
      `step 3 - contracting`,
    ],

    texto_etapa4: [
      `step 4 - goods/service \ndelivery`,
    ],

    texto_etapa5: [
      `step 5 - invoicing \n& payments`,
    ],

    dialogo_loja_festa: [
      'Do you want to buy anything?'
    ],

    dialogo_gizmo_festa: [
      'This party is amazing!'
    ],

    dialogo_romeu_festa: [
      `You've done a great job`,
    ],

    dialogo_celeste_festa: [
      'Hi!'
    ],

    dialogo_aysla_festa: [
      `Hello, How is it going?`,
    ],

    faleComRei: [
      `Speak with the King`
    ]
  },
};

export default dialogs;
