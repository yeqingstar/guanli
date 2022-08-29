$(function () {
  $.ajax({
    url: 'https://www.yjyan.cn/mi/carslistApi.php',
    data: [],
    typeof: 'GET',
    dataType: "JSON",
    async: false,
    success: function (data) {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        var sta = data[i].isSelected == 0 ? '' : "checked"
        console.log(sta)
        var htmltag = `
                <tr class="item">
                <td><input type="checkbox" ${sta} value="${data[i].cid}" class="checked" name="che" style="margin-left:-10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="float: right;"><img src="${data[i].thumb}" alt=""></span></td>
                <td >${data[i].cname}</td>
                <td ><span class="prices">${data[i].price}</span></td>
                <td class="but"><button style="z-index: 5; margin-right: 10px; border-right: 1px solid rgb(187, 186, 186);" class="jian">-</button>
                <input type="text" value="${data[i].cnt}" class="num">
                <button style="z-index: 5; border-left: 1px solid rgb(187, 186, 186); margin-left: 10px;" class="jia">+</button>
                </td>
                <td class="totalmoey">${data[i].price*data[i].cnt}</td>
                <td class="end"> <div style="width: 25px; height: 25px; border-radius: 50%; border: 1px solid #ffff;"><i id="del" class="iconfont" >&#xe606;</i></div></td>
                </tr>
                <hr>
                `
        $(".tbody").append(htmltag)
      }
      // console.log(htmltag);

    },
    err: function () {
      alert('11')
    }
  })
  // 全选按钮
  $('.checked').each(function () {
    if ($(this).prop('checked') == true) {
      $('#checkbox').prop('checked', true)
    } else {
      $('#checkbox').prop('checked', false)
    }
  })


  $("#checkbox").click(function () {
    $('.checked').prop('checked', $("#checkbox").prop('checked'))
    var stas = $(this).prop('checked') == true ? 1 : 0
    $('.checked').each(function () {
      console.log($(this).val());
      $.ajax({
        url: 'https://www.yjyan.cn/mi/editstatusApi.php',
        data: {
          cid: $(this).val(),
          status: stas
        },
        type: 'GET',
        dataType: "JSON",
        success: function (data) {
          // console.log(data);
        },
      })
      bian()
      dataxuan()
      find()
    })

  });
  $(".item").on('click', '.checked', function () {

    // var a=$('input[name=che]:checked').val()
    // console.log(a);
    var a = $('#xiao')
    var b = $('.bto22')
    if ($('.checked:checked').length == $('.checked').length) {

      $('#checkbox').prop('checked', true)
      a.hide()
      b.css("background-color", "orangered")
      $('.bto22 a').css("color", "black")
    } else {
      $('#checkbox').prop('checked', false)
      a.show()
    }
    var a = []
      var b = []
    $('.checked').each(function () {
      if ($(this).prop('checked') == true) {
        var cid=$(this).val()
        a.push(cid)
        var num = $(this).parents('.item').find('.num').val()
        // b.push(num)
        localStorage.setItem("checked", a)
         localStorage.setItem("nm", num)
      //   console.log(a);
      //   // console.log(b);
      }
      // console.log(cid);
   console.log(a);
    })
  
    var stas = $(this).prop('checked') == true ? 1 : 0
    $.ajax({
      url: 'https://www.yjyan.cn/mi/editstatusApi.php',
      data: {
        cid: $(this).val(),
        status: stas,
      },
      type: 'GET',
      dataType: "JSON",

      success: function (data) {
        console.log(data);

      },
    })
    find()
    dataxuan()
    bian()
  })

  function find() {
    if ($('.checked:checked').length > 0) {
      $('#xiao').hide()
      $('.bto22').css("background-color", "orangered")
      $('.bto22 a').css("color", "black")
    } else {
      $('#xiao').show()
      $('.bto22').css("background-color", "gray")
      $('.bto22 a').css("color", "black")
    }

  }
  dataxuan()

  function dataxuan() {
    var xu = 0;
    $('.checked').each(function () {
      if ($(this).prop("checked")) {
        xu++;

      }

      // console.log(  $('input[checked="checked"]').porp("checked", true)  )
    })
    $('.xu').html("已选择" + xu + "件")
  }
  bian()

  function bian() {
    var cont = 0
    $('.checked').each(function () {
      if ($(this).prop('checked')) {
        var price = $(this).parents('.item').find('.prices').html()
        console.log(price);
        var num = $(this).parents('.item').find('.num').val()
        console.log(num);
        var moeny = parseFloat(price * num)
        cont += moeny

      }
      $('.total').html("合计：" + cont + "元")
    })
  }
  xioaji()

  function xioaji() {
    $('.jia').each(function () {
      var price = $(this).parents('.item').find('.prices').html()
      var num = $(this).parents('.item').find('.num').val()
      $(this).parents('.item').find('.totalmoey').html(price * num)
    })
  }


  $('.but').on('click', '.jian', function () {
    // var num = $(this).val()
    var cid = $(this).parents('.item').find('.checked').val()
    console.log(cid);
    var num = $(this).siblings('.num').val()
    // console.log(a);
    if (num > 1) {
      num--;
    }
    var nums = num
    $(this).siblings('.num').val(nums)
    console.log(nums);
    $.ajax({
      url: 'https://www.yjyan.cn/mi/editNumApi.php',
      data: {
        num: nums,
        cid: cid,
      },
      typeof: 'GET',
      dataType: "JSON",
      "success": function (result) {
        console.log(result);
      },
    })
    xioaji()
    bian()
  })



  $('.but').on('click', '.jia', function () {

    var cid = $(this).parents('.item').find('.checked').val()
    console.log(cid);
    var num = $(this).siblings('.num').val()
    num++;
    var nums = num
    var num = $(this).siblings('.num').val(nums)
    $.ajax({
      url: 'https://www.yjyan.cn/mi/editNumApi.php',
      data: {
        num: nums,
        cid: cid,
      },
      typeof: 'GET',
      dataType: "JSON",
      success: function (result) {
        console.log(result);
      },
    })
    xioaji()
    bian()
  })



  $('.end').on('click', '#del', function () {
    var del = $(this).parents('.item').find('.checked').val()
    $(this).parents('tr').remove()
    if (swal("确定删除所选商品")) {


    }

    $.ajax({
      url: 'https://www.yjyan.cn/mi/delApi.php',
      data: {
        cid: del,
      },
      typeof: 'GET',
      dataType: "JSON",
      success: function (result) {
        console.log(result);
      },
    })
    xioaji()
  })
  $('.item .num').blur(function () {
    var cid = $(this).parents('.item').find('.checked').val()

    var price = $(this).parents('.item').find('.prices').html()

    var bs = $(this).parents('.item').find('.num').val()
    console.log(bs);
    $(this).parents('.item').find('.totalmoey').html(price * bs)
    $.ajax({
      url: 'https://www.yjyan.cn/mi/editNumApi.php',
      data: {
        num: bs,
        cid: cid,
      },
      typeof: 'GET',
      dataType: "JSON",
      success: function (result) {
        console.log(result);
      },
    })
  })
})