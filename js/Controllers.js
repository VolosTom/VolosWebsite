/**
 * Created by tom on 10/30/14.
 */

second.controller('buttonsCtrl', function($scope){

    $scope.vanillaOptions = ['Vanilla', 'Vanilla_KO', 'Vanilla_KI', 'Vanilla_KIKO' ,'Vanilla_Soft', 'Vanilla_Flip', 'Vanilla_Parasian'];

    $scope.accrualOptions = ['Accrual_Range_In', 'Accrual_Range_Out', 'Accrual_In', 'Accrual_Out'];

    $scope.averageOptions = ['Average_Floating_Strike', 'Average_Fixed_Strike'];

    $scope.binaryOptions = ['Binary_In', 'Binary_Out', 'Binary_Range_In', 'Binary_Range_Out', 'Binary_In_KO', 'Binary_Out_KO', 'Binary_Range_In_KO', 'Binary_Range_Out_KO', 'Binary_In_KI', 'Binary_Out_KI', 'Binary_Range_In_KI', 'Binary_Range_Out_KI', 'Binary_In_KIKO', 'Binary_Out_KIKO', 'Binary_Range_In_KIKO', 'Binary_Range_Out_KIKO'];

    $scope.lookbackOptions = ['Lookback_Fixed_Strike', 'Lookback_Floating_Strike', 'Lookback_Ladder', 'Lookback_Shout'];

    $scope.touchOptions = ['One_Touch', 'Double_One_Touch', 'Two_Touch', 'No_Touch', 'Double_No_Touch', 'Choice_Double_No_Touch', 'Forgiving_Double_No_Touch'];

    $scope.otherOptions = ['Forward', 'Ratchet', 'Compound_Call', 'Compound_Put', 'Logarithm', 'Power', 'Pay_Later', 'Installment', 'Simple_Chooser', 'Complex_Chooser'];

    $scope.multiassetOptions = ['Exchange', 'Basket', 'Spread', 'Best_Of', 'Worst_Of'];


//------------------------


    $scope.volotilityOptions = ['Volatility_Implied', 'Volatility_Historical', 'Volatility_VIX', 'Variance_Implied', 'Variance_Historical'];


    $scope.namesArray = ['vanillaOptions', 'accrualOptions', 'averageOptions', 'binaryOptions', 'lookbackOptions', 'touchOptions', 'otherOptions', 'multiassetOptions'];

    $scope.nameTom = 'vanillaOptions';

});