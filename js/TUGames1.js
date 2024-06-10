"use strict";


var	TUG = TUG || {};
TUG.GR = {};

TUG.mCurrentFrame = 0;			//	�o�߃t���[����
TUG.mFPS = 60;					//	�t���[�����[�g
TUG.mHeight = 120;				//	���z��ʁE����
TUG.mWidth = 128;				//	���z��ʁE��


TUG.onTimer = function(){}


TUG.init = function()
{
	TUG.GR.mCanvas = document.createElement( "canvas" );	//	���z��ʂ��쐬
	TUG.GR.mCanvas.width  = TUG.mWidth;							//	���z��ʂ̕���ݒ�
	TUG.GR.mCanvas.height = TUG.mHeight;						//	���z��ʂ̍�����ݒ�
	TUG.GR.mG = TUG.GR.mCanvas.getContext( "2d" );				//	���z��ʂ�2D�`��R���e�L�X�g���擾

	requestAnimationFrame( TUG.wmTimer );
}


//	IE�Ή�
TUG.Sign = function( val )
{
	if( val == 0 ){
		return( 0 );
	}
	if( val < 0 ){
		return( -1 );
	}
	return( 1 );
}


TUG.wmTimer = function()
{
	if( !TUG.mCurrentStart ){					//	����Ăяo����
		TUG.mCurrentStart = performance.now();	//	�J�n������ݒ�
	}

	let		d = Math.floor( ( performance.now() - TUG.mCurrentStart ) * TUG.mFPS / 1000 ) - TUG.mCurrentFrame;
	if( d > 0 ){
		TUG.onTimer( d );
		TUG.mCurrentFrame += d;
	}

	requestAnimationFrame( TUG.wmTimer );
}
